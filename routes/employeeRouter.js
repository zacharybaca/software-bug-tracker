const express = require("express");
const employeeRouter = express.Router();
const Employee = require("../models/employee.js");

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
      const employeeToBeUpdated = await Employee.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      console.log("Updated Employee Data:", employeeToBeUpdated); // Log incoming data
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

module.exports = employeeRouter;
