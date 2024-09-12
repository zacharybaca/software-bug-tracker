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
      type: String,
      unique: true,
      sparse: true
    },
    password: {
      type: String,
      required: function () {
        return !!this.user.userID; // Dynamically require password if userID exists
      },
    },
    associatedEmployee: {
      type: String,
      required: function () {
        return !!this.user.userID;
      }
    }
  },
  accessCode: {
    type: String,
    required: function () {
      return !!this.user.userID; // Dynamically require accessCode if userID exists
    },
  },
  generateAccessCode: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  },
});

// Pre-save hook to remove empty userID
employeeSchema.pre('save', function (next) {
  if (this.user && this.user.userID === "") {
    this.user.userID = undefined; // Remove empty userID
  }
  next();
});

module.exports = mongoose.model("Employee", employeeSchema);
