const mongoose = require("mongoose");
const Employee = require("./models/employee"); // Adjust this path to your Employee model
require("dotenv").config();

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    cleanUserIDs();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

connectToMongoDB();

const cleanUserIDs = async () => {
  try {
    // Remove documents where 'user.userID' is null or empty string
    const result1 = await Employee.deleteMany({ "user.userID": null });
    const result2 = await Employee.deleteMany({ "user.userID": "" });

    console.log("Null userIDs removed:", result1.deletedCount);
    console.log("Empty string userIDs removed:", result2.deletedCount);
  } catch (error) {
    console.error("Error cleaning userIDs:", error);
  } finally {
    mongoose.connection.close(); // Close the connection after the script finishes
  }
};



