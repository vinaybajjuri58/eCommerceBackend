const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSignUp = async (req, res) => {
  const { email, name, password } = req.body;
  const userExists = await User.findOne({ email: email });
  try {
    if (userExists) {
      return res.status(500).json({
        success: true,
        message: "Email is already registered",
      });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      name,
      password: hashPassword,
      wishlist: [],
      cart: [],
    });
    const savedUser = await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User successfully registered",
      user: {
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error in registering user",
    });
  }
};

const userSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "Email is not registered",
      });
    }
    const validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ userId: userExists._id }, process.env.KEY);
    res.status(200).json({
      success: true,
      message: "LoggedIn successfully",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in logging process",
    });
  }
};
module.exports = {
  userSignIn,
  userSignUp,
};
