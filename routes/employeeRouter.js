const express = require("express");
const employeeRouter = express.Router();
const Employee = require("../models/employee.js");
const jwt = require('jsonwebtoken');

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
      const user = await Employee.findOne({"user.userID": req.body.userID})
      if (user) {
        res.status(403)
        return next(new Error('Username has already been taken'))
      }

      const employeeToBeUpdated = await Employee.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );

      if (employeeToBeUpdated.user) {
        const newUser = employeeToBeUpdated.user;
        const token = jwt.sign(newUser.toObject(), process.env.SECRET)
        return res.status(201).send({user: newUser, token})
      }
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
      const employeeToBeUpdated = await Employee.findByIdAndUpdate(id, req.body, { new: true });
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

      if (req.body.password !== employee.user.password) {
        res.status(403);
        return next(new Error("Incorrect Username or Password"));
      }

      const token = jwt.sign(employee.toObject(), process.env.SECRET);
      return res.status(201).send({employee, token});
    } catch (error) {
      res.status(500);
      return next(error);
    }
  })

module.exports = employeeRouter;
