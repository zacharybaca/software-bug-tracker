const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const mongoose = require('mongoose');
const morgan = require('morgan');
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const server = require('http').createServer(app);
const { expressjwt } = require("express-jwt");
let io;

// Middleware That Will Serve Static Files from Uploads Folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === "production") {
    io = require("socket.io")(server, {
      cors: {
        origin: "https://software-bug-tracker.onrender.com",
        methods: ["GET", "POST"],
      },
      transports: ["websocket", "polling"],
    });
}
else {
    io = require("socket.io")(server, {
      cors: {
        origin: "http://localhost:9000",
        methods: ["GET", "POST"],
      },
      transports: ["websocket", "polling"],
    });
}

const users = {};
const usersTyping = {};

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

// Middleware For Reading Requests From Body
app.use(express.json());

// Middleware That Will Help With Debugging Server Requests
app.use(morgan('dev'));

// Middleware That Will Serve Our Static Files
app.use(express.static(path.join(__dirname, "client", "software-bug-tracker", "dist")));

// Middleware That Will Help With Routing To The Appropriate Routes
app.use('/api/main', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}));
app.use("/api/main/tasks", require("./routes/taskRouter.js"));
app.use("/api/employees", require("./routes/employeeRouter.js"));

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};

io.on("connection", client => {
    client.on("username", username => {
        const user = {
            name: username,
            id: client.id
        };
        users[client.id] = user;
        io.emit("connected", user);
        io.emit("users", Object.values(users));
    });

    client.on("send", message => {
        io.emit("message", {
            text: message,
            date: new Date().toISOString(),
            user: users[client.id]
        });
    });

    client.on("typingStart", (typingUser) => {
      console.log("Broadcasting typing event with username:", typingUser);
      const currentTyper = {
        name: typingUser,
        id: client.id,
      };
      usersTyping[client.id] = currentTyper;
      io.emit("typingUsers", Object.values(usersTyping));
    });

    client.on("typingStop", () => {
      delete usersTyping[client.id];
      io.emit("typingUsers", Object.values(usersTyping));
    });

    client.on("disconnect", () => {
      const username = users[client.id];
      delete users[client.id];
      io.emit("disconnected", client.id);
    });
});

connectToMongoDB();

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }
    return res.send({errMsg: err.message});
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, "client", "software-bug-tracker", "dist", "index.html")));

// Initiates Connection to Server
server.listen(process.env.PORT, () => {
    console.log(`Server Listening on ${process.env.PORT}`);
});
