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
      console.log('Employee: ', req.body.assignedEmployee);
      req.body.assignedEmployee.user.userID = req.auth._id;
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
      // First, find the Employee document where the userID matches
      const employee = await Employee.findOne({
        "user.userID": req.auth._id,
      });

      if (!employee) {
        return res.status(404).send("Employee not found");
      }

      // Then, use the employee's _id to find tasks assigned to that employee
      const foundTasks = await Task.find({
        assignedEmployee: employee._id,
      });
      console.log("Employee: ", employee._id);
      return res.status(200).send(foundTasks);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  });
    

 taskRouter.route("/taskCompleted").get(async (req, res, next) => {
   try {
     const taskCompleted = req.query.taskCompleted;

     const foundCompletedStatus = await Task.find({ taskCompleted });

     return res.status(200).send(foundCompletedStatus);
   } catch (error) {
     res.status(500);
     return next(error);
   }
 });

taskRouter.route('/:id')
    .put(async (req, res, next) => {
        try {
            const id = req.params.id;
            const taskToBeUpdated = await Task.findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            )
            return res.status(201).send(taskToBeUpdated);
        } catch (error) {
            res.status(500);
            return next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const id = req.params.id;
            const taskToBeDeleted = await Task.findOneAndDelete({ _id: id });
            return res.status(200).send(`You Have Successfully Deleted ${taskToBeDeleted.taskTitle}`);
        } catch (error) {
            res.status(500);
            return next(error);
        }
    })

    

   


module.exports = taskRouter;