const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    companyDetails: { type: String, require: true },
    cat: { type: String, require: true },
    type: { type: String, require: true },
    skills: [{ type: String, require: true }],
    experience: { type: Number, require: true },
    desc: { type: String, require: true },
    salary: { type: Number, require: true },
    applications: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },

        AppId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Application",
          require: true,
        },
      },
    ],
    tags: [{ type: String, require: true }],
    additionalInfo: [{}],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Job", JobSchema);
