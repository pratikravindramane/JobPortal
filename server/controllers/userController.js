const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const genrateToken = require("../utils/genrateToken");
const Job = require("../models/JobsModel");
const Application = require("../models/ApplicationModel");
const JobsModel = require("../models/JobsModel");
const { transporter } = require("../utils/nodeMailer");
const fs = require("fs");
const pdf = require("pdf-parse");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("user not found with this Email");
    const verify = await bcrypt.compare(password, user.password);
    if (!verify) throw new Error(" wrong credentials ");

    // genrate token
    const token = genrateToken(user._id);
    res.cookie("token", token);
    user.token = token;
    await user.save();
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user = await User.findOne({ email: email });
    if (user) throw new Error("user already exists with this email");
    const newuser = new User({ ...req.body, password: hash });
    await newuser.save();
    res.send(newuser);
  } catch (error) {
    throw new Error(error);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = genrateToken(user._id);
    user.token = token;
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3001/reset-password/${token}'>Click Here</>`;
    const data = {
      from: "pratik.mane7727@gmail.com",
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    await transporter.sendMail(data);
    res.json({ msg: "Reset password email send to" + email });
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) throw new Error(" Token Expired, Please try again later");
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hash(password, salt);
  user.password = hash;
  await user.save();
  res.json(user);
});

const getAUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error("user Not Found");
    res.send(user);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({});
    if (!jobs) throw new Error("Jobs Not Found");
    res.send(jobs);
  } catch (error) {
    throw new Error(error);
  }
});

const getAJob = asyncHandler(async (req, res) => {
  // Extracted text content
  try {
    const job = await Job.findById(req.params.id)
      .populate("applications.userId")
      .populate("applications.AppId");
    if (!job) throw new Error("Job Not Found");
    res.send(job);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserApplication = asyncHandler(async (req, res) => {
  try {
    const jobs = await Application.find({ userId: req.params.id }).populate(
      "jobId"
    );
    if (!jobs) throw new Error("Jobs Not Found");
    res.send(jobs);
  } catch (error) {
    throw new Error(error);
  }
});

const getOneApp = asyncHandler(async (req, res) => {
  try {
    const job = await Application.findById(req.params.id).populate("jobId");
    if (!job) throw new Error("Job Not Found");
    res.send(job);
  } catch (error) {
    throw new Error(error);
  }
});

const apply = asyncHandler(async (req, res) => {
  try {
    let imgPath = "";
    if (req.file) {
      imgPath = req.file.filename;
    }

    const application = new Application({
      resume: imgPath,
      userId: req.body.userId,
      jobId: req.params.id,
    });
    application.save();

    // scan pdf and create scroe
    const pdfFilePath = `public/${imgPath}`;
    const dataBuffer = fs.readFileSync(pdfFilePath);
    const data = await pdf(dataBuffer);
    const job = await JobsModel.findById(req.params.id);
    const skills = job.skills;
    const lowercaseSentence = data.text.toLowerCase();
    const sentenceWords = lowercaseSentence.match(/\b\w+\b/g) || [];
    const wordsInArray = sentenceWords.filter((word) => skills.includes(word));
    const final = wordsInArray.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    const score = (final.length / skills.length) * 100;
    application.score = score;
    await application.save();

    job.applications.push({ AppId: application._id, userId: req.body.userId });
    await job.save();

    res.send(application);
  } catch (error) {
    throw new Error(error);
  }
});
const getJobApplications = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({ jobId: req.params.id });
    console.log(req.params.id);
    if (!jobs) throw new Error("Jobs Not Found");
    res.send(jobs);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  login,
  register,
  getAUser,
  getAllJobs,
  getAJob,
  getUserApplication,
  getOneApp,
  getJobApplications,
  forgotPasswordToken,
  resetPassword,
  //   applyWithEase,
  apply,
};
