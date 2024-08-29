const express = require('express');
const morgan = require('morgan');
require("dotenv").config();
const mongoose = require('mongoose');
const app = express();


// Middleware For Reading Requests From Body
app.use(express.json());

// Middleware That Will Help With Debugging Server Requests
app.use(morgan('combined'));

// Middleware That Will Help With Routing To The Appropriate Routes
app.use('/api/tasks', require('./routes/taskRouter.js'));
app.use('/api/employees', require('./routes/employeeRouter.js'));


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
    return res.send(`Error: ${err}`);
});


// Initiates Connection to Server
app.listen(9000, () => {
    console.log("Server Listening on Port 9000");
});