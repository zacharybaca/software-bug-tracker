const express = require("express");
const employeeRouter = express.Router();
const Employee = require("../models/employee.js");
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const blacklistedTokens = new Set(); // Set to store blacklisted tokens

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = req.body.firstName && req.body.lastName ? `${req.body.firstName}-${req.body.lastName}-${Date.now()}${path.extname(file.originalname)}` : `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

employeeRouter.route("/login").post(async (req, res, next) => {
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

    const token = jwt.sign(
      { _id: employee._id, userID: employee.user.userID },
      process.env.SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    return res.status(201).send({
      user: { _id: employee._id, userID: employee.user.userID },
      token,
    });
  } catch (error) {
    res.status(500);
    return next(error);
  }
});

employeeRouter.route("/logout").post(async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(400).json({ message: "No token provided" });

    blacklistedTokens.add(token); // Invalidate the token
    res.json({ message: "Logged out successfully" });
});

const upload = multer({ storage: storage });

employeeRouter
  .route("/")
  .get(async (req, res, next) => {
    try {
      const foundEmployees = await Employee.find();
      const employeesWithHasUserID = foundEmployees.map((employee) => ({
        ...employee.toObject(),
        hasUserID: employee.hasUserID
      }));
      return res.status(200).send(employeesWithHasUserID);
    } catch (error) {
      res.status(500);
      return next(error);
    }
  })
  .post(upload.single("avatar"), async (req, res, next) => {
    try {
      const newEmployee = new Employee(req.body);
      const avatar = req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/default-profile-pic.jpg";

      if (avatar) {
        newEmployee.avatar = avatar;
      }

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
  .get(async (req, res, next) => {
    try {
      const id = req.params.id;
      const employee = await Employee.findById(id);

      if (!employee) {
        return res.status(400).send("Employee Does Not Exist");
      }

      return res.status(200).send({
        ...employee.toObject(),
        hasUserID: employee.hasUserID
      });
    } catch (error) {
      res.status(500);
      return next(error);
    }
  })
  .put(upload.single("avatar"), async (req, res, next) => {
    try {
      const id = req.params.id;
      let avatar = req.file
        ? `/uploads/${req.file.filename}`
        : "/uploads/default-profile-pic.jpg";

      // Get the current employee
      const currentEmployee = await Employee.findById(id);

      if (!currentEmployee) {
        return res.status(404).send("Employee Not Found");
      }

      // Check if the username is being updated
      if (req.body.user && req.body.user.userID) {
        const existingEmployee = await Employee.findOne({
          "user.userID": req.body.user.userID,
        });

        // If another employee has the same userID, and it's not the current employee, throw an error
        if (existingEmployee && existingEmployee._id.toString() !== id) {
          res.status(403);
          return next(new Error("Username has already been taken"));
        }
      }

      // Check if the password is being updated
      if (req.body.user && req.body.user.password) {
        // Hash the new password before updating
        const hashedPassword = await bcrypt.hash(req.body.user.password, 10);
        req.body.user.password = hashedPassword; // Replace the plain text password with the hash
      }

      // Check if the accessCode is being reissued
      if (req.body.generateAccessCode && req.body.accessCode) {
        req.body.accessCode = Math.floor(Math.random() * 5000) + 1;
      }

      if (req.body.avatar) {
        avatar = req.body.avatar;
      }
      else {
        req.body.avatar = avatar;
      }

      // Update the employee with the new details
      const employeeToBeUpdated = await Employee.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      );

      if (!employeeToBeUpdated) {
        return res.status(404).json({ error: "Employee Not Found" });
      }

      const token = jwt.sign(
        {
          _id: employeeToBeUpdated._id,
          userID: employeeToBeUpdated.user.userID
        },
        process.env.SECRET
      );
      return res.status(201).send({
        user: {
          _id: employeeToBeUpdated._id,
          userID: employeeToBeUpdated.user.userID,
          avatar: employeeToBeUpdated.avatar
        },
        token,
      });
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

employeeRouter
  .route("/:id/reset-password")
  .put(async (req, res, next) => {
    try {
      const { userID, accessCode, newPassword, confirmPassword } = req.body;

      // Validate required fields
      if (!userID || !accessCode || !newPassword || !confirmPassword) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Find employee by userID and accessCode
      const employee = await Employee.findOne({
        "user.userID": userID,
        accessCode: accessCode
      });

      if (!employee) {
        return res.status(403).json({ error: "Invalid userID or accessCode" });
      };

      // Validate if new password and confirm password match
      if (newPassword !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      };

      // Hash the new password
      employee.user.password = await bcrypt.hash(newPassword, 10);

      // Save the updated employee document
      await employee.save();

      return res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
      res.status(500);
      return next(error);
    }
  });

module.exports = employeeRouter;
