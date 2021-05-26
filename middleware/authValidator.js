const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
export const authValidator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User is not loggedIn",
      });
    }
    const { userId } = jwt.verify(token, "shhhhh");
    const user = User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Doesnt exist",
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error while validating user",
    });
  }
};
module.exports = {
  authValidator,
};
