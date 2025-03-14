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
    // Add the category field here
    category: {
        type: String,
        enum: ['Frontend', 'Backend', 'Performance', 'Security', 'Uncategorized'],  // Optional: limit categories to these options
        default: 'Uncategorized'  // Default category if none provided
    },
    assignedEmployee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }
});

// You may want to add methods related to category in the future, like updating it based on task data

taskSchema.methods.getSummary = function() {
    return {
        title: this.taskTitle,
        completed: this.taskCompleted,
        details: this.taskDetails,
        category: this.category  // Include category in the summary
    };
};

taskSchema.methods.markComplete = function() {
    this.taskCompleted = true;
    return this.save();
};

module.exports = mongoose.model("Task", taskSchema);
