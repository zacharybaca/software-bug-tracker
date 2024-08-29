const express = require('express');
const taskRouter = express.Router();
const Task = require('../models/task.js');



taskRouter.route('/')
    .get(async (req, res, next) => {
        try {
            const foundTasks = await Task.find();
            return res.status(200).send(foundTasks);
        } catch (error) {
            res.status(500);
            return next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const newTask = new Task(req.body);
            const savedTask = await newTask.save();
            return res.status(201).send(savedTask);
        } catch (error) {
            res.status(500);
            return next(error);
        }
    })

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