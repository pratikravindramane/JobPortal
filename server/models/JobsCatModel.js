const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var JobCat = new mongoose.Schema(
  {
    categorie: { type: String },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("JobCat", JobCat);
