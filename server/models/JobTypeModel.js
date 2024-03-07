const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var JobType = new mongoose.Schema(
  {
    type: { type: String },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("JobType", JobType);
