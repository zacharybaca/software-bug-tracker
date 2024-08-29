const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    roleAtCompany: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean
    }
})

module.exports = mongoose.model("Employee", employeeSchema);