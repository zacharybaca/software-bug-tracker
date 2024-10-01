const express = require("express");
const employeeRouter = express.Router();
const Employee = require("../models/employee.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

employeeRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const foundEmployees = await Employee.find();
      return res.status(200).send(foundEmployees);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newEmployee = new Employee(req.body);
      if (newEmployee.generateAccessCode) {
        newEmployee.accessCode = Math.floor(Math.random() * 5000) + 1;
      }
      const savedEmployee = await newEmployee.save();
      return res.status(201).send(savedEmployee);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  });

employeeRouter
  .route("/:id")
  .put(async (req, res, next) => {
    try {
      const id = req.params.id;

      // Check for duplicate userID
      const user = await Employee.findOne({ "user.userID": req.body.user.userID });
      if (user && user._id.toString() !== id) {
        res.status(403);
        return next(new Error('Username has already been taken'));
      }

      // Check if the request body contains a password
      if (req.body.user && req.body.user.password) {
        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
        req.body.user.password = hashedPassword; // Replace the plain text password with the hash
      }

      // Update employee with the new details
      const employeeToBeUpdated = await Employee.findByIdAndUpdate(id, req.body, {
        new: true, // Return the updated document
      });

      if (employeeToBeUpdated.user) {
        // Generate a new token after the update
        const token = jwt.sign(
          { _id: employeeToBeUpdated._id, userID: employeeToBeUpdated.user.userID },
          process.env.SECRET
        );
        return res.status(201).send({ _id: employeeToBeUpdated._id, user: employeeToBeUpdated.user.userID, token });
      }

      // Send the updated employee back if no token is generated
      return res.status(201).send(employeeToBeUpdated);

    } catch (error) {
      res.status(500);
      return next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const id = req.params.id;
      const employeeToBeDeleted = await Employee.findOneAndDelete({ _id: id });
      return res
        .status(200)
        .send(`You Have Successfully Deleted ${employeeToBeDeleted.firstName}`);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  });

employeeRouter.route('/employee/:id')
  .put(async (req,res,next) => {
    try {
      const id = req.params.id;

      // Check if username is being updated
      if (req.body.user && req.body.user.userID) {
        const existingEmployee = await Employee.findOne({ "user.userID": req.body.user.userID });
        
        // If another employee has the same userID, throw an error
        if (existingEmployee && existingEmployee._id.toString() !== id) {
          res.status(403);
          return next(new Error('Username has already been taken'));
        }
      }

      // Check if the password is being updated
      if (req.body.user && req.body.user.password) {
        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
        req.body.user.password = hashedPassword; // Replace plain text password with the hash
      }

      // Check if the accessCode is being reissued
      if (req.body.generateAccessCode && req.body.accessCode) {
        req.body.accessCode = Math.floor(Math.random() * 5000) + 1;
      }
      
      // Update the employee with the new details
      const employeeToBeUpdated = await Employee.findByIdAndUpdate(id, req.body, { new: true });

      // Send back the updated employee data
      return res.status(201).send(employeeToBeUpdated);

    } catch (error) {
      res.status(500);
      return next(error);
    }
    
  })

employeeRouter.route('/login')
  .post(async (req,res,next) => {
    try {
      const employee = await Employee.findOne({ "user.userID": req.body.userID });

      if (!employee) {
        res.status(403);
        return next(new Error("Incorrect Username or Password"));
      }

      // checkPassword is an added method on the Employee Schema on the backend
      const passwordCheck = await employee.checkPassword(req.body.password);
      if (!passwordCheck) {
        res.status(403);
        return next(new Error("Incorrect Username or Password"));
      }

      const token = jwt.sign({_id: employee._id, userID: employee.user.userID}, process.env.SECRET);
      return res.status(201).send({
       user: { _id: employee._id, userID: employee.user.userID },
       token
     });
    } catch (error) {
      res.status(500);
      return next(error);
    }
  })

module.exports = employeeRouter;
