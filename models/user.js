// models / user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  dateOfBirth: { type: Date },
  yourNameForUs: { type: String }, 


  profession: { type: String },
  interests: { type: [String] }, 
  experienceLevel: { type: String }, 
  marketingConsent: { type: Boolean },
  preferredContactTime: { type: String }, 
  newsletterSubscription: { type: Boolean },

 
    profileIcon: {
    type: String,
    enum: ["user", "smile", "robot", "alien", "cat"],
    default: "user",
  },

});

const User = mongoose.model("User", userSchema);

module.exports = User;

