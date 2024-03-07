const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      const decode = jwt.verify(token, process.env.JWT);
      const user = await User.findById(decode.id);
      req.user = user;
      next();
    } else {
      throw new Error("Invalid Token");
    }
  } else {
    throw new Error("you don't have a token to access this route");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const role = req.user.isAdmin;
    if (role) {
      next();
    } else {
      throw new Error("you are not authorized");
    }
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = { authMiddleware, isAdmin };
