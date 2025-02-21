const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require('mongoose');
const morgan = require('morgan');
require("dotenv").config({ path: './.env' });
const server = require('http').createServer(app);
const { expressjwt } = require("express-jwt");
const { v4: uuidv4 } = require('uuid');
let filter;
let io;

// Dynamically import the 'bad-words' module in CommonJS
(async () => {
  const { Filter } = await import('bad-words'); // Access the named export directly
  filter = new Filter();
})();

// Middleware to serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize Socket.IO
if (process.env.NODE_ENV === "production") {
  io = require("socket.io")(server, {
    path: "/ws/socket.io",
    cors: {
      origin: "https://software-bug-tracker.onrender.com",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });
} else {
  io = require("socket.io")(server, {
    path: "/ws/socket.io",
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });
}

// User-related maps
const users = {};
const usersTyping = {};

// Middleware for CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://software-bug-tracker.onrender.com"
        : "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "client", "software-bug-tracker", "dist")));

// Protected API routes
app.use('/api/main', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use("/api/main/tasks", require("./routes/taskRouter.js"));
app.use("/api/employees", require("./routes/employeeRouter.js"));

// WebSocket connection handler
// Store the timestamp of the last message for each user



const lastMessageTimestamps = {};
const lastMessages = {};
const throttleDelays = {}; // Dynamic delays for exponential backoff

io.on("connection", (client) => {
  const userUUID = uuidv4();
  console.log("New Connection: ", userUUID);

  // Handle username assignment
  client.on("username", (username) => {
    const user = {
      name: username,
      id: userUUID,
    };
    users[userUUID] = user;

    // Notify all clients of the new user
    io.emit("connected", user);
    io.emit("users", Object.values(users));

    console.log("User Connected: ", user);
    console.log("Current Users: ", Object.values(users));
  });

  // Handle message sending
  client.on("send", (message) => {
    try {
      const user = users[userUUID];

      if (!user) {
        console.error("Message received from unknown user");
        return;
      }

      // Validation: Check for empty message or too long
      if (!message.text || message.text.trim() === "") {
        client.emit("errorMessage", "Message cannot be empty.");
        return;
      }
      if (message.text.length > 500) {
        client.emit("errorMessage", "Message exceeds the 500-character limit.");
        return;
      }

      // Profanity filtering
      const cleanedMessage = filter.clean(message.text);

      // Duplicate message prevention
      if (lastMessages[userUUID] === cleanedMessage) {
        client.emit("errorMessage", "Duplicate messages are not allowed.");
        return;
      }
      lastMessages[userUUID] = cleanedMessage;

      // Throttling: Allow only one message per second per user
      const now = Date.now();
      const lastMessageTime = lastMessageTimestamps[userUUID] || 0;
      const baseDelay = 1000; // 1 second base delay
      const userDelay = throttleDelays[userUUID] || baseDelay;

      if (now - lastMessageTime < userDelay) {
        // Increase delay exponentially on repeated fast sends
        throttleDelays[userUUID] = userDelay * 2;
        client.emit(
          "errorMessage",
          `You're sending messages too quickly. Please wait ${userDelay / 1000} seconds.`
        );
        return;
      } else {
        // Reset delay after successful send
        throttleDelays[userUUID] = baseDelay;
      }
      lastMessageTimestamps[userUUID] = now;

      // Broadcast the message if all checks pass
      io.emit("message", {
        text: cleanedMessage,
        date: new Date().toISOString(),
        user: message.user.name,
        avatar: message.avatar,
      });
      console.log("Message Sent: ", user.name);
    } catch (err) {
      console.error("Error processing message:", err);
      client.emit(
        "errorMessage",
        "An error occurred while sending your message."
      );
    }
  });

  // Handle typing start
  client.on("typingStart", (typingUser) => {
    console.log("Broadcasting typing event with username:", typingUser);
    const currentTyper = {
      name: typingUser,
      id: userUUID,
    };

    usersTyping[userUUID] = currentTyper;
    io.emit("typingUsers", Object.values(usersTyping));
  });

  // Handle typing stop
  client.on("typingStop", () => {
    delete usersTyping[userUUID];
    io.emit("typingUsers", Object.values(usersTyping));
  });

  // Handle disconnection
  client.on("disconnect", () => {
    const disconnectedUser = users[userUUID];

    if (disconnectedUser) {
      console.log("Disconnected User: ", disconnectedUser.name);

      // Remove the user from the maps
      delete users[userUUID];
      delete usersTyping[userUUID];

      // Notify all clients of the disconnected user
      io.emit("disconnected", disconnectedUser);

      console.log("Current Users After Disconnection: ", Object.values(users));
    }
  });
});

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

connectToMongoDB();

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "UnauthorizedError") {
    return res.status(err.status).send({ errMsg: err.message });
  }
  return res.send({ errMsg: err.message });
});

// Serve the React app
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, "client", "software-bug-tracker", "dist", "index.html"))
);

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`Server Listening on ${process.env.PORT}`);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed");
  process.exit(0);
});
