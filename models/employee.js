const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  roleAtCompany: {
    type: String,
    required: true,
  },
  user: {
    userID: {
      type: String
    },
    password: {
      type: String,
      required: function () {
        return !!this.user.userID; // Dynamically require password if userID exists
      },
    },
  },
   accessCode: {
      type: String,
      required: function () {
        return !!this.user.userID; // Dynamically require accessCode if userID exists
      },
    },
    generateAccessCode: {
        type: Boolean
    },
  isAdmin: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);