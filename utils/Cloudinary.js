const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_key,
  api_secret: process.env.API_secret,
});

module.exports = cloudinary;
