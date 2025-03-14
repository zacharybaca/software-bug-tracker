const mongoose = require('mongoose');
const fs = require('fs');
const { Parser } = require('json2csv');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(err => {
    console.log("Error connecting to MongoDB:", err);
  });

// Define your task schema (if not already defined)
const taskSchema = new mongoose.Schema({
  taskTitle: String,
  taskCompleted: Boolean,
  taskDetails: String,
  taskTodos: [String],  // Assuming it's an array of tasks
  assignedEmployee: String,
  category: String,  // You might need to add this field to the schema
});

const Task = mongoose.model('Task', taskSchema);

// Fetch data from MongoDB
Task.find()
  .then(tasks => {
    const data = tasks.map(task => ({
      taskTitle: task.taskTitle,
      taskCompleted: task.taskCompleted ? 1 : 0,  // Convert to 1 or 0
      taskDetails: task.taskDetails,
      taskTodos: task.taskTodos.length,  // Assuming it's a count of todos
      assignedEmployee: task.assignedEmployee,
      Category: task.category,  // Add the category (Frontend, Backend, etc.)
    }));

    // Convert data to CSV format
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);

    // Save CSV to a file
    fs.writeFileSync('data.csv', csv);
    console.log('Data successfully exported to data.csv');
  })
  .catch(err => {
    console.log("Error fetching tasks:", err);
  });
