// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // To ensure each email is unique
  },
  graduation: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true, // Path to the resume file
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
