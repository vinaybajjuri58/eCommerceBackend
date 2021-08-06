const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authValidator = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "User is not loggedIn",
      });
    }
    const { userId } = jwt.verify(token, process.env.KEY);
    const user = await User.findById(userId)
      .select("-password -__v")
      .populate({
        path: "cart",
        populate: { path: "productId" },
      })
      .populate({
        path: "wishlist",
        populate: { path: "productId" },
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Doesnt exist",
      });
    }
    req.user = user;
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
