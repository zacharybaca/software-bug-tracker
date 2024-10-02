const express = require('express');
const taskRouter = express.Router();
const Task = require('../models/task.js');
const Employee = require('../models/employee.js');


// Endpoints To Provide Managers The Capability to View, Delete, Update, and Add Tasks to Any Employee
// To Fix Auth ID Assignment Issue, Since assignedEmployee is Not Getting Assigned, I Need to Get The ID of The Employee
// Currently Logged In, By Querying the Database to Find the Employee That Has the UserID Associated With Them That is Currently Stored 
// On Local Storage
taskRouter.route("/")
  .post(async (req, res, next) => {
    try {
      console.log('Employee ID: ', req.body.assignedEmployee._id);
      console.log('Auth ID: ', req.auth._id)
      if (!req.body.assignedEmployee._id) {
        req.body.assignedEmployee._id = req.auth._id;
      }
      const newTask = new Task(req.body);
      const savedTask = await newTask.save();
      return res.status(201).send(savedTask);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  })
  
  .get(async (req, res, next) => {
    try {
      console.log('Auth: ', req.auth);
      // First, find the Employee document where the userID matches
      const employee = await Employee.findOne({
        _id: req.auth._id,
      });

      if (!employee) {
        return res.status(404).send("Employee not found");
      }

      // Then, use the employee's _id to find tasks assigned to that employee
      const foundTasks = await Task.find({
        assignedEmployee: employee._id,
      });
      console.log("Employee: ", employee._id);
      console.log("Found Tasks: ", foundTasks)
      return res.status(200).send(foundTasks);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  });
    

 taskRouter.route("/taskCompleted").get(async (req, res, next) => {
   try {
     const employee = await Employee.findOne({
      _id: req.auth._id
     });

     if (!employee) {
      return res.status(404).send("Employee not found");
     }

     const taskCompleted = req.query.taskCompleted === "true";

     const foundTasks = await Task.find({
      assignedEmployee: employee._id
     });

     const foundCompletedStatus = foundTasks.filter(task => task.taskCompleted === taskCompleted);

     return res.status(200).send(foundCompletedStatus);
   } catch (error) {
     res.status(500);
     return next(error);
   }
 });

  taskRouter.route('/:id')
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

        if (task.assignedEmployee == null) {
          const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
            new: true,
          });

          return res.status(200).send(updatedTask);
        }

        // Check if the employee is assigned to this task
        if (task.assignedEmployee != null && !employee._id.equals(task.assignedEmployee)) 
          {
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
    .delete(async (req, res, next) => {
        try {
            const employee = await Employee.findOne({ _id: req.auth._id });

            if (!employee) {
              return res.status(404).send("Employee Not Found")
            }
            const id = req.params.id;
            const task = await Task.findById(id);

            if (!task) {
              return res.status(404).send("Task Not Found")
            }

            

            if (!employee._id.equals(task.assignedEmployee)) {
              return res.status(403).json({
                message: "You do not have permission to delete this task."
              })
            }

            const taskToBeDeleted = await Task.findOneAndDelete({ _id: id });
            return res.status(200).send(`You Have Successfully Deleted ${taskToBeDeleted.taskTitle}`);

        } catch (error) {
            res.status(500);
            return next(error);
        }
    })

  taskRouter.route('/unassigned-tasks')
    .get(async (req, res, next) => {
      try {
        const unassignedTasks = await Task.find({
          $or: [{ assignedEmployee: null }, { assignedEmployee: undefined }],
        });
        console.log('Unassigned: ', unassignedTasks);
        if (!unassignedTasks.length) {
          return res.status(200).json({ message: "No unassigned tasks found" });
        }
        return res.status(200).send(unassignedTasks);
      } catch (error) {
        res.status(500);
        return next(error);
      }
    });
module.exports = taskRouter;