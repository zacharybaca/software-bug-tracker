const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

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
        return !!this.user.userID && !!this.user.password
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
employeeSchema.pre("save", function (next) {
  if (this.user && (!this.user.userID || this.user.userID === "")) {
    this.user.userID = undefined; // Set null or empty string userID to undefined
  }
  next();
});

// Pre-save hook to hash password before saving to DB
employeeSchema.pre("save", async function(next) {
  const user = this.user;
  if (user.isModified('password')) {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (error) {
      return next(error);
    }
  }
})

// Added method to check if hashed password equals plain-text password
employeeSchema.methods.checkPassword = async function (passwordAttempt) {
  try {
    const isMatch = await bcrypt.compare(passwordAttempt, this.user.password);
    return isMatch;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

// Added method that removes password from object before sending back to client
employeeSchema.methods.withoutPassword = function() {
  const user = this.toObject();
  delete user.password;
  return user;
}
module.exports = mongoose.model("Employee", employeeSchema);
