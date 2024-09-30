const express = require('express');
const morgan = require('morgan');
require("dotenv").config();
const mongoose = require('mongoose');
const {expressjwt} = require('express-jwt');
const app = express();
const path = require('path');


// Middleware For Reading Requests From Body
app.use(express.json());

// Middleware That Will Help With Debugging Server Requests
app.use(morgan('combined'));

// Middleware That Will Serve Our Static Files
app.use(express.static(path.join(__dirname, "client", "dist")));

// Middleware That Will Help With Routing To The Appropriate Routes
app.use('/api/main', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
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

connectToMongoDB();


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === "UnauthorizedError") {
        res.status(err.status);
    }
    return res.send({errMsg: err.message});
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, "client", "dist", "index.html")));

// Initiates Connection to Server
app.listen(process.env.PORT, () => {
    console.log(`Server Listening on ${process.env.PORT}`);
});