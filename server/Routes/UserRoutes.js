const {
  login,
  register,
  getAUser,
  getAllJobs,
  getAJob,
  getUserApplication,
  getOneApp,
  getJobApplications,
  //   applyWithEase,
  apply,
  forgotPasswordToken,
  resetPassword,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/AuthMiddleware");
const { upload } = require("../utils/uploadImg");

const route = require("express").Router();

// auth
route.post("/login", login);
route.post("/register", register);
route.post("/forgot", forgotPasswordToken);
route.post("/reset/:token", resetPassword);
route.get("/:id", authMiddleware, getAUser);

//  jobs
route.get("/all/jobs", authMiddleware, getAllJobs);
route.get("/jobs/:id", authMiddleware, getAJob);

// application
route.get("/app/:id", authMiddleware, getUserApplication);
route.get("/all/app/job/:id", authMiddleware, getJobApplications);
route.get("/one/app/:id", authMiddleware, getOneApp);
// route.post("/apply/ease/:id"), authMiddleware, applyWithEase;
route.post("/apply/:id", upload.single("image"), authMiddleware, apply);

module.exports = route;
