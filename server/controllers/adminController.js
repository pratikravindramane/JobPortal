const asyncHandler = require("express-async-handler");
const JobsCat = require("../models/JobsCatModel");
const JobsType = require("../models/JobTypeModel");
const Application = require("../models/ApplicationModel");
const Jobs = require("../models/JobsModel");
const { transporter } = require("../utils/nodeMailer");
const fs = require("fs");
const pdf = require("pdf-parse");
const createJob = asyncHandler(async (req, res) => {
  const { skills, tags } = req.body;
  const newTag = tags.split(",");
  const newSkills = skills.split(" ");
  try {
    const job = new Jobs({ ...req.body, skills: newSkills, tags: newTag });
    job.save();
    res.send(job);
  } catch (error) {
    throw new Error(error);
  }
});

const updateJob = asyncHandler(async (req, res) => {
  try {
    const job = await Jobs.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    res.send(job);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteJob = asyncHandler(async (req, res) => {
  try {
    const job = await Jobs.findByIdAndDelete(req.params.id);
    res.send("deleted successfully");
  } catch (error) {
    throw new Error(error);
  }
});

// categories
const getAllJobCat = asyncHandler(async (req, res) => {
  try {
    const cats = await JobsCat.find({});
    if (!cats) throw new Error("Jobs Categories Not Found");
    res.send(cats);
  } catch (error) {
    throw new Error(error);
  }
});

const createJobCat = asyncHandler(async (req, res) => {
  try {
    const jobCat = new JobsCat(req.body);
    jobCat.save();
    res.send(jobCat);
  } catch (error) {
    throw new Error(error);
  }
});

// const updateJobCat = asyncHandler(async (req, res) => {
//   try {
//     const cats = await JobsCat.findByIdAndUpdate(req.params.id, {
//       categorie: req.body.categorie,
//     });
//     if (!cats) throw new Error("Categories Not Found");
//     res.send(cats);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const deleteJobCat = asyncHandler(async (req, res) => {
  try {
    const cats = await JobsCat.findByIdAndDelete(req.params.id);
    res.send("deleted successfully");
  } catch (error) {
    throw new Error(error);
  }
});

// type
const getAllJobType = asyncHandler(async (req, res) => {
  try {
    const cats = await JobsType.find({});
    if (!cats) throw new Error("Jobs Type Not Found");
    res.send(cats);
  } catch (error) {
    throw new Error(error);
  }
});

const createJobType = asyncHandler(async (req, res) => {
  try {
    const jobType = new JobsType(req.body);
    jobType.save();
    res.send(jobType);
  } catch (error) {
    throw new Error(error);
  }
});

// const updateJobType = asyncHandler(async (req, res) => {
//   try {
//     const cats = await JobsType.findByIdAndUpdate(req.params.id, {
//       categorie: req.body.categorie,
//     });
//     if (!cats) throw new Error("Type Not Found");
//     res.send(cats);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const deleteJobType = asyncHandler(async (req, res) => {
  try {
    const cats = await JobsType.findByIdAndDelete(req.params.id);
    res.send("deleted successfully");
  } catch (error) {
    throw new Error(error);
  }
});

// application
const updateApplication = asyncHandler(async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    })
      .populate("userId")
      .populate("jobId");
    const HTML = `Hi, your application is ${req.body.status}. at ${app?.jobId?.title}`;

    console.log(app?.userId?.email);
    console.log(process.env.SENDER);
    const data = {
      from: process.env.SENDER,
      to: `${app?.userId?.email},${process.env.SENDER}`,
      text: "Hey User",
      subject: `Application ${req.body.status}`,
      html: HTML,
    };
    const info = await transporter.sendMail(data);
    res.send(app);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllApplications = asyncHandler(async (req, res) => {
  try {
    const app = await Application.find({}).populate("userId");
    res.send(app);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getAllJobCat,
  createJobCat,
  //   updateJobCat,
  deleteJobCat,
  getAllJobType,
  createJobType,
  //   updateJobType,
  getAllApplications,
  deleteJobType,
  updateApplication,
};
