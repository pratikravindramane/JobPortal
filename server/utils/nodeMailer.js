const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // host: "smtp.ethereal.email",

  service: "gmail",
  port: 587,
  auth: {
    user: process.env.SENDER,
    pass: process.env.PASS,
  },
});
module.exports = { transporter };
