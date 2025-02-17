const app = require("express");
const Router = app.Router();
const AuthRouterHandlers = require("../RouteHandlers/AuthRouteHandlers");
const UserRoute = require("../RouteHandlers/userRoutehandlers");
const ChatRoutes = require("../RouteHandlers/ChatHandlers");
const MessageRoutes = require("../RouteHandlers/MessageController");
const uploads = require('../Multer/Multer')
// Auth Routes
Router.route("/auth/registeruser").post(uploads.single('image') , AuthRouterHandlers.registeruser);
Router.route("/auth/loginuser").post(AuthRouterHandlers.loginuser);
Router.route("/auth/forgotpassword").post(AuthRouterHandlers.forgotpassword);
Router.route("/auth/resetpassword/:token").patch(AuthRouterHandlers.resetpassword);

// get currently logedin  Users Data
Router.route("/getuserdata").get(
  AuthRouterHandlers.protectRoutes,
  UserRoute.getuserdetails
);
Router.route("/getAlluserdata").get(
  AuthRouterHandlers.protectRoutes,
  UserRoute.getAlluserdetails
);

// start chat between two users 

Router.route('/chat/startchat').post(AuthRouterHandlers.protectRoutes , ChatRoutes.startchat)
Router.route('/chat/getallchats').get(AuthRouterHandlers.protectRoutes , ChatRoutes.getAllchats)
Router.route('/chat/sendmessage').post(AuthRouterHandlers.protectRoutes , MessageRoutes.sendmessage)
Router.route('/chat/getallmessages/:chatID').get(AuthRouterHandlers.protectRoutes , MessageRoutes.getallmessages)

module.exports = Router;
