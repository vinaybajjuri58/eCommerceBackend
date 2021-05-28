const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: "Add a name",
  },
  email: {
    type: String,
    required: "Email is required",
  },
  password: {
    type: String,
    required: "Password is required",
  },
  wishlist: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Wishlist",
    },
  ],
  cart: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Cart",
    },
  ],
});
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
