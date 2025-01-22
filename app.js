// const express = require('express');
// const app = express();
// const path = require("path");
// const cors = require("cors");
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
// const server = require('http').createServer(app);
// const { expressjwt } = require("express-jwt");
// const { v4: uuidv4 } = require('uuid');
// let io;

// // Middleware That Will Serve Static Files from Uploads Folder
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// if (process.env.NODE_ENV === "production") {
//     io = require("socket.io")(server, {
//       cors: {
//         origin: "https://software-bug-tracker.onrender.com",
//         methods: ["GET", "POST"],
//       },
//       transports: ["websocket", "polling"],
//     });
// }
// else {
//     io = require("socket.io")(server, {
//       cors: {
//         origin: "http://localhost:5173",
//         methods: ["GET", "POST"],
//       },
//       transports: ["websocket", "polling"],
//     });
// }

// const users = {};
// const disconnectedUsers = {};
// const usersTyping = {};

// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? "https://software-bug-tracker.onrender.com"
//         : "http://localhost:5173",
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );

// // Middleware For Reading Requests From Body
// app.use(express.json());

// // Middleware That Will Help With Debugging Server Requests
// app.use(morgan('dev'));

// // Middleware That Will Serve Our Static Files
// app.use(express.static(path.join(__dirname, "client", "software-bug-tracker", "dist")));

// // Middleware That Will Help With Routing To The Appropriate Routes
// app.use('/api/main', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}));
// app.use("/api/main/tasks", require("./routes/taskRouter.js"));
// app.use("/api/employees", require("./routes/employeeRouter.js"));

// io.on("connection", client => {
//   const userUUID = uuidv4();

//   console.log("New Connection: ", userUUID);

//     client.on("username", username => {
//         const user = {
//             name: username,
//             id: userUUID,
//         };
//         users[userUUID] = user;
//         const usersList = Object.values(users);
//         io.emit("connected", user);
//         io.emit("users", usersList);
//         console.log("User Connected: ", user);
//         console.log("Current Users: ", usersList);
//     });

//     client.on("send", message => {
//         const user = users[userUUID];

//         if (user) {
//           io.emit("message", {
//             text: message.text,
//             date: new Date().toISOString(),
//             user: message.user.name,
//             avatar: message.avatar
//           });
//           console.log('Message Sent: ', user.name);
//         } else {
//           console.error("Message received from unknown user");
//         }
//     });

//     client.on("typingStart", (typingUser) => {
//       console.log("Broadcasting typing event with username:", typingUser);
//       const currentTyper = {
//         name: typingUser,
//         id: userUUID,
//       };

//       const user = users[userUUID];

//       if (user) {
//         usersTyping[userUUID] = currentTyper;
//         io.emit("typingUsers", Object.values(usersTyping));
//       }
//       else {
//         io.emit("typingUsers", Object.values(usersTyping));
//       }
//     });

//     client.on("typingStop", () => {
//       const currentTyper = usersTyping[userUUID];

//       if (currentTyper) {
//         delete usersTyping[userUUID];
//         io.emit("typingUsers", Object.values(usersTyping));
//       }
//       else {
//         io.emit("typingUsers", Object.values(usersTyping));
//       }
//     });

//     client.on("disconnect", (loggedInUser) => {
//       const disconnectedUser = {
//         name: loggedInUser,
//         id: userUUID
//       };

      

//       if (disconnectedUser) {
//         disconnectedUsers[userUUID] = disconnectedUser;
//         console.log("Disconnected User: ", disconnectedUser.name);
//         delete users[userUUID];
//         delete usersTyping[userUUID];
//         io.emit("disconnected", disconnectedUser);
//       }
//       else {
//         return null;
//       }
//     });
// });


// const connectToMongoDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       serverSelectionTimeoutMS: 30000
//     });
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//   }
// };

// connectToMongoDB();

// // Global Error Handler
// app.use((err, req, res, next) => {
//     console.error(err);
//     if (err.name === "UnauthorizedError") {
//         res.status(err.status);
//     }
//     return res.send({errMsg: err.message});
// });

// app.get('*', (req, res) => res.sendFile(path.join(__dirname, "client", "software-bug-tracker", "dist", "index.html")));

// // Initiates Connection to Server
// server.listen(process.env.PORT, () => {
//     console.log(`Server Listening on ${process.env.PORT}`);
// });

const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require('mongoose');
const morgan = require('morgan');
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const server = require('http').createServer(app);
const { expressjwt } = require("express-jwt");
const { v4: uuidv4 } = require('uuid');
let io;

// Middleware to serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize Socket.IO
if (process.env.NODE_ENV === "production") {
  io = require("socket.io")(server, {
    cors: {
      origin: "https://software-bug-tracker.onrender.com",
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });
} else {
  io = require("socket.io")(server, {
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
    const user = users[userUUID];

    if (user) {
      io.emit("message", {
        text: message.text,
        date: new Date().toISOString(),
        user: message.user.name,
        avatar: message.avatar,
      });
      console.log("Message Sent: ", user.name);
    } else {
      console.error("Message received from unknown user");
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
    res.status(err.status);
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
