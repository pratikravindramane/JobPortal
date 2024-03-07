const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    isAdmin: { type: Boolean, default: false },
    jobCat: { type: String },
    jobType: { type: String },
    skills: [{ type: String }],
    experience: { type: Number },
    desc: { type: String },
    saleryExp: { type: Number },
    token: { type: String },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
