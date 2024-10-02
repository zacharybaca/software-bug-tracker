const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskTitle: {
        type: String,
        required: true
    },
    taskCompleted: {
        type: Boolean,
        default: false
    },
    taskDetails: {
        type: String,
        required: true
    },
    taskTodos: {
        type: String,
    },
    assignedEmployee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        default: null
    }
})

module.exports = mongoose.model("Task", taskSchema);