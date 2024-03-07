const {
  createJob,
  updateJob,
  deleteJob,
  getAllJobCat,
  createJobCat,
  deleteJobCat,
  getAllJobType,
  createJobType,
  deleteJobType,
  updateApplication,
  getAllApplications,
} = require("../controllers/adminController");
const { authMiddleware, isAdmin } = require("../middlewares/AuthMiddleware");
const route = require("express").Router();

route.get("/all/job-type", getAllJobType);
route.get("/all/job-cat", getAllJobCat);
route.get("/all/application", authMiddleware, isAdmin, getAllApplications);
route.post("/create/job", authMiddleware, isAdmin, createJob);
route.post("/job-type", authMiddleware, isAdmin, createJobType);
route.post("/job-cat", authMiddleware, isAdmin, createJobCat);
route.put("/job", authMiddleware, isAdmin, updateJob);
route.put("/application/:id", authMiddleware, isAdmin, updateApplication);
route.delete("/job-cat/:id", authMiddleware, isAdmin, deleteJobCat);
route.delete("/job-type/:id", authMiddleware, isAdmin, deleteJobType);
route.delete("/job", authMiddleware, isAdmin, deleteJob);
// application

module.exports = route;
