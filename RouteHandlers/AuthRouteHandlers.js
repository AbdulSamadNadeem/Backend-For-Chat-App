const AuthModel = require("../Models/AuthModel");
const tokenGen = require("../helper/app");
const jwt = require("jsonwebtoken");
const utils = require("util");
const crypto = require('crypto');
const ResetPassword = require('../Mailtrap/mailtrap')
const cloudinary = require('../utils/Cloudinary')
const dotenv = require('dotenv')
dotenv.config()


exports.registeruser = async (req, res) => {
  try {
    const {email} = req.body
    const validateUser = await AuthModel.findOne({ email });
    if (validateUser) {
     return res.status(401).json({
        status: "Unauthorized",
        message: "Email Already Exists!",
      });
    }
    const user = await AuthModel.create(req.body);
    const result =  await cloudinary.v2.uploader.upload(req.file.path , {folder : 'public'})
    user.image = result.secure_url
    await user.save() 
    res.status(201).json({
      status: "Success",
      message: "User Created Successfully!",
      data: user,
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};
exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validateUser = await AuthModel.findOne({ email }).select('+password');
    if (!validateUser) {
      res.status(401).json({
        status: "Unauthorized",
        message: "Email Not Exists!",
      });
    }
    const ValidatePass = await validateUser.comparepassword(
      password,
      validateUser.password
    );
    if (!ValidatePass) {
     return res.status(401).json({
        status: "Unauthorized",
        message: "Incorrect Password!",
      });
    }
    const token = tokenGen.SignToken(validateUser._id);
    res.status(200).json({
      status: "Success",
      message: "Loged In Successfully",
      token,
      data: validateUser,
    });
    console.log(token)
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: err.message,
    });
  }
};
exports.forgotpassword = async (req,res) => {
   try{
      const {email} = req.body
      const user = await AuthModel.findOne({email})
      if(!user){
       return res.status(401).json({
          status: "Unauthorized",
          message: "user not found",
        });
      }
      const resettoken = crypto.randomBytes(20).toString('hex')
      const encryptedToken = crypto.createHash('sha256').update(resettoken).digest('hex')
       user.resettoken = encryptedToken
       user.resetpasstokenexpires = Date.now() + 10 * 60 * 1000

       await user.save()

       ResetPassword.SendResetEmail(email , `localhost:5173/auth/resetpassword/${resettoken}`)
       res.status(200).json({
        status: "Success",
        message: "Password Reset Token Generated!",
        resettoken,
      });
    }catch(err){
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
    }
}
exports.resetpassword = async (req,res) => {
  try{

      const token = crypto.createHash('sha256').update(req.params.token).digest('hex')
      const user = await AuthModel.findOne({ resettoken: token})
      if(!user){
        return res.status(401).json({
          status: "Unauthorized",
          message: "user not found",
        });
      }
      user.password = req.body.password
      user.resettoken = undefined
      user.resettokenexpires = undefined

      await user.save()
      res.status(200).json({
        status: "success",
        message: "Password reset successfully",
      });
    }catch(err){
      res.status(400).json({
        status: "Failed",
        message: err.message,
      });
  }
}

exports.protectRoutes = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let key;
    if (!token) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "Invalid Token",
      });
    }
    if (token && token.startsWith("Bearer")) {
      key = token.split(" ")[1];
    }
    const decodedtoken = await utils.promisify(jwt.verify)(
      key,
      process.env.SECRET_KEY
    );

    const user = await AuthModel.findById(decodedtoken.id);
    if (!user) {
      return res.status(401).json({
        status: "Unauthorized",
        message: "No User Exist with This Token",
      });
    }
    user.isOnline = true
    await user.save()
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "Unauthorized",
      message: `Invalid Token ${err.message}`,
    });
  }
};
