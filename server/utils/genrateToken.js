const jwt = require("jsonwebtoken");
const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT);
};
module.exports = genrateToken;
