const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
    rebuildIndex();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

connectToMongoDB();

const rebuildIndex = async () => {
  try {
    const Employee = mongoose.connection.collection("employees");

    // Drop the existing index
    await Employee.dropIndex({ "user.userID": 1 });
    console.log("Index dropped.");

    // Recreate the index
    await Employee.createIndex(
      { "user.userID": 1 },
      { unique: true, sparse: true }
    );
    console.log("Index recreated with unique and sparse constraints.");
  } catch (error) {
    console.error("Error rebuilding index:", error);
  } finally {
    mongoose.connection.close();
  }
};
