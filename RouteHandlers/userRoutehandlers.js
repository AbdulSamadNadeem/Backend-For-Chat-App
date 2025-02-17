const AuthModel = require("../Models/AuthModel");

// get the info of currently logedin user

exports.getuserdetails = async (req, res) => {
  try {
    const user = await AuthModel.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        status: "Failed",
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "user fetched!",
      user,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: "Something Went Wrong!",
    });
  }
};

// fetch all the users from data base except the logedin ones

exports.getAlluserdetails = async (req, res) => {
  try {
    const Allusers = await AuthModel.find({_id : {$ne : req.user._id}});
    if (!Allusers) {
      return res.status(400).json({
        status: "Failed",
        message: "user not found",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "All user fetched!",
      Allusers,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: "Something Went Wrong!",
    });
  }
};
