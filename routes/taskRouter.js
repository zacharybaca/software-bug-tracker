const express = require("express");
const taskRouter = express.Router();
const Task = require("../models/task.js");
const Employee = require("../models/employee.js");

// Endpoints for Managers to View, Delete, Update, and Add Tasks to Any Employee

// POST: Add a new task, assigning the task to the logged-in employee if not explicitly assigned

taskRouter.route("/").post(async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ _id: req.auth._id });

    // Check if assignedEmployee is provided
    let foundEmployee;
    if (req.body.assignedEmployee) {
      foundEmployee = await Employee.findOne({ _id: req.body.assignedEmployee });

      // Ensure the assigned employee is registered
      if (!foundEmployee || !foundEmployee.user || !foundEmployee.user.userID) {
        return res
          .status(404)
          .send("Cannot Assign Tasks to Employees Who Are Not Registered");
      }
    }

    // Admin logic
    if (employee.isAdmin) {
      // If admin does not provide an assigned employee, set to null
      if (!req.body.assignedEmployee) {
        req.body.assignedEmployee = null;
      }
    } else {
      // Non-admins can only assign tasks to themselves
      req.body.assignedEmployee = req.auth._id;
    }

    // Create and save new task
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    return res.status(201).send(savedTask);
  } catch (error) {
    res.status(500);
    return next(error);
  }
})
  // GET: Retrieve all tasks for the logged-in employee or all tasks if the employee is an admin
  .get(async (req, res, next) => {
    try {
      console.log("Auth: ", req.auth);

      const employee = await Employee.findOne({ _id: req.auth._id });

      if (!employee) {
        return res.status(404).send("Employee not found");
      }

      // Admins can view all tasks
      if (employee.isAdmin) {
        const allTasks = await Task.find();
        const filteredUnassigned = allTasks.filter(task => task.assignedEmployee != null);
        return res.status(200).send(filteredUnassigned);
      }

      // Non-admins can only view their own tasks
      const foundTasks = await Task.find({ assignedEmployee: employee._id });
      console.log("Employee: ", employee._id);
      console.log("Found Tasks: ", foundTasks);
      return res.status(200).send(foundTasks);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  });

// GET: Filter completed tasks for the logged-in employee
taskRouter.route("/taskCompleted").get(async (req, res, next) => {
  try {
    const employee = await Employee.findOne({ _id: req.auth._id });

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    const taskCompleted = req.query.taskCompleted === "true";

    // If Employee is an Admin, Enable Them to View All Incomplete/Completed Tasks From Other Users
    if (employee.isAdmin) {
      const foundTasks = await Task.find();
      const foundCompletedStatus = foundTasks.filter((task) => task.taskCompleted === taskCompleted && task.assignedEmployee != null);
      return res.status(200).send(foundCompletedStatus);
    }

    const foundTasks = await Task.find({ assignedEmployee: employee._id });
    const foundCompletedStatus = foundTasks.filter(
      (task) => task.taskCompleted === taskCompleted
    );

    return res.status(200).send(foundCompletedStatus);
  } catch (error) {
    res.status(500);
    return next(error);
  }
});

// PUT: Update a task if the employee has permission to do so
taskRouter
  .route("/:id")
  .put(async (req, res, next) => {
    try {
      const employee = await Employee.findOne({ _id: req.auth._id });

      if (!employee) {
        return res.status(404).send("Employee not found");
      }

      const id = req.params.id;
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).send("Task not found");
      }

      // Check if task is unassigned
      if (task.assignedEmployee == null) {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res.status(200).send(updatedTask);
      }

      // Check if Employee is An Admin
      if (employee.isAdmin) {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        return res.status(200).send(updatedTask);
      }

      // Check if the employee is assigned to this task
      if (employee._id.toString() !== task.assignedEmployee.toString()) {
        return res.status(403).json({
          message: "You do not have permission to update this task.",
        });
      }

      // Proceed with the update
      const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return res.status(200).send(updatedTask);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  })
  // DELETE: Remove a task if the employee has permission to do so
  .delete(async (req, res, next) => {
    try {
      const employee = await Employee.findOne({ _id: req.auth._id });

      if (!employee) {
        return res.status(404).send("Employee Not Found");
      }

      const id = req.params.id;
      const task = await Task.findById(id);

      if (!task) {
        return res.status(404).send("Task Not Found");
      }

      // Check if task is unassigned
      if (task.assignedEmployee == null) {
        const taskToBeDeleted = await Task.findOneAndDelete({ _id: id });
        return res
          .status(200)
          .send(`You Have Successfully Deleted ${taskToBeDeleted.taskTitle}`);
      }

      // Admins can delete any task
      if (employee.isAdmin) {
        const taskToBeDeleted = await Task.findOneAndDelete({ _id: id });
        return res
          .status(200)
          .send(`You Have Successfully Deleted ${taskToBeDeleted.taskTitle}`);
      }

      // Employees can delete their own tasks
      if (employee._id.toString() !== task.assignedEmployee.toString()) {
        return res.status(403).json({
          message: "You do not have permission to delete this task.",
        });
      }

      // Delete Task If User Owns the Task
      const taskToBeDeleted = await Task.findOneAndDelete({ _id: id });
      return res.status(200).send(`You Have Successfully Deleted ${taskToBeDeleted.taskTitle}`);

    } catch (error) {
      res.status(500);
      return next(error);
    }
  });

// GET: Retrieve unassigned tasks (assignedEmployee is null)
taskRouter.route("/unassigned-tasks").get(async (req, res, next) => {
  try {
    const unassignedTasks = await Task.find({ assignedEmployee: null });
    console.log("Unassigned Tasks: ", unassignedTasks);

    if (!unassignedTasks.length) {
      return res.status(200).json({ message: "No unassigned tasks found" });
    }

    return res.status(200).send(unassignedTasks);
  } catch (error) {
    res.status(500);
    return next(error);
  }
});

// Add a new update to a task
taskRouter.route("/:taskId/updates", async (req, res, next) => {
  try {
    const { updateText } = req.body;
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).send("Task not found");

    task.taskUpdates.push({ updateText });
    await task.save();
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Edit an existing update
taskRouter.route("/:taskId/updates/:updateId", async (req, res, next) => {
   try {
     const { updateText } = req.body;
     const task = await Task.findById(req.params.taskId);
     if (!task) return res.status(404).send("Task not found");

     const update = task.taskUpdates.id(req.params.updateId);
     if (!update) return res.status(404).send("Update not found");

     update.updateText = updateText;
     update.updatedAt = new Date();
     await task.save();
     res.status(200).send(task);
   } catch (err) {
     res.status(500).send(err);
   }
});

// Delete a specific update from task
taskRouter.route("/:taskId/updates/:updateId", async (req, res, next) => {
    try {
      const task = await Task.findById(req.params.taskId);
      if (!task) return res.status(404).send("Task not found");

      task.taskUpdates.id(req.params.updateId).remove();
      await task.save();
      res.status(200).send({ message: "Update removed successfully", task });
    } catch (err) {
      res.status(500).send(err);
    }
});

// Delete all updates from a task
taskRouter.route("/:taskId/updates", async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).send("Task not found");

    task.taskUpdates = [];
    await task.save();
    res.status(200).send({ message: "All updates removed successfully", task });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = taskRouter;
