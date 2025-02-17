const jwt = require("jsonwebtoken");

exports.SignToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY);
};
