const { extend } = require("lodash");
const mongoose = require("mongoose");
const { Cart } = require("../models/cart.model");

const getAllCartItems = async (req, res) => {
  const user = req.user;
  let cartItems;
  try {
    cartItems = user.cart;
    const normalizedCartItems = cartItems.map((item) => {
      const { _id, ...doc } = item._id._doc;
      return { _id: _id, ...doc, quantity: item.quantity };
    });
    res.json({
      success: true,
      cartItems: normalizedCartItems,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error in getting cart Items",
      errMessage: err.errMessage,
    });
  }
};

const addCartItem = async (req, res) => {
  const user = req.user;
  const cartItem = req.body;
  const newCartItem = new Cart(cartItem);
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const savedCartItem = await newCartItem.save({ session: session });
    user.cart.push(savedCartItem._id);
    await user.save({ session: session });
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Added a new Item to cart",
      cartItem: savedCartItem,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: "Error in adding a new product to cart",
      errMessage: err.errMessage,
    });
  }
};

const updateCartItem = async (req, res) => {
  let { cartItem } = req;
  const { quantity } = req.body;
  if (quantity > 0) {
    cartItem.quantity = quantity;
    const updatedCartItem = await cartItem.save();
    res.json({
      success: true,
      cartItem: updatedCartItem,
    });
  } else {
    const updatedCartItem = await cartItem.remove();
    res.json({
      success: true,
      cartItem: updatedCartItem,
    });
  }
};

const deleteCartItem = async (req, res) => {
  let user = req.user;
  try {
    const { cartItem } = req;
    const session = await mongoose.startSession();
    await session.startTransaction();
    await cartItem.remove({ session: session });
    user.cart.pull(cartItem._id);
    await user.save({ session: session });
    await session.commitTransaction();
    res.json({
      success: true,
      message: "Deleted  cart Item",
      cartItem,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "error in deleting a cart Item",
      errMessage: err.errMessage,
    });
  }
};
module.exports = {
  getAllCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
};
