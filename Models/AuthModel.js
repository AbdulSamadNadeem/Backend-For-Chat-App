const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const AuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: [true, "Email is required"],
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 6,
          minUppercase: 1,
          minNumbers: 2,
          minLowercase: 1,
          minSymbols: 0,
        }),
    },
    select:false
  },
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
    trim: true,
    minLength: 3,
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
    unique: true,
  },
  image:{
    type:String
  },
  resettoken:{
    type:String
  },
  resettokenexpires:{
    type:Date
  },
  isOnline:{
    type:Boolean,
    default:false
  }
});

AuthSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  try {
    user.password = await bcrypt.hash(user.password, 10);
  } catch (e) {
    next(e);
  }
});

AuthSchema.methods.comparepassword = async function (pass, passDB) {
  return await bcrypt.compare(pass, passDB);
};

const AuthModel = mongoose.model("users", AuthSchema);

module.exports = AuthModel;
