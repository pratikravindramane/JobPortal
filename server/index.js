const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const ErrorHandler = require("./middlewares/ErrorHandler");
const cookieParser = require("cookie-parser");
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/public", express.static("public"));
// connect to DB
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};
app.use("/user", require("./Routes/UserRoutes"));
app.use("/admin", require("./Routes/AdminRoutes"));
app.use(ErrorHandler);

app.listen(process.env.PORT, () => {
  console.log("connected to backend at port:" + process.env.PORT);
  connect();
});
