const express = require("express");
const userRouter = express.Router();
const { userSignUp, userSignIn } = require("../controllers/user.controller");
userRouter.route("/signup", userSignUp);
userRouter.route("/login", userSignIn);
module.exports = {
  userRouter,
};
