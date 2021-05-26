const express = require("express");
const userRouter = express.Router();
const { userSignUp, userSignIn } = require("../controllers/user.controller");
userRouter.route("/signup").post(userSignUp);
userRouter.route("/login").post(userSignIn);
module.exports = {
  userRouter,
};
