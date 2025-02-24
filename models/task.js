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
    taskUpdates: [
        {
            updateText: { type: String, required: false },
            updatedAt: { type: Date, default: Date.now }
        }
    ],

    assignedEmployee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }
});


taskSchema.methods.getSummary = function() {
    return {
        title: this.taskTitle,
        completed: this.taskCompleted,
        details: this.taskDetails
    };
};

taskSchema.methods.markComplete = function() {
    this.taskCompleted = true;
    return this.save();
};

module.exports = mongoose.model("Task", taskSchema);
