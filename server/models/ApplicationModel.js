const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    skills: [{ type: String, require: true }],
    experience: { type: Number, require: true },
    desc: { type: String, require: true },
    salary: { type: Number, require: true },
    score: { type: String, default: "0" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      require: true,
    },
    resume: { type: String },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Application", userSchema);
