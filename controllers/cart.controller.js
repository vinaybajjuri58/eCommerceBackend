const { extend } = require("lodash");
const { Cart } = require("../models/cart.model");
const getAllCartItems = async (req, res) => {
  let cartItems;
  try {
    cartItems = await Cart.find({}).populate("_id");
    const normalizedCartItems = cartItems.map((item) => {
      const { _id, ...doc } = item._id._doc;
      return { id: _id, ...doc, quantity: item.quantity };
    });
    res.json({
      success: true,
      cartItems: normalizedCartItems,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in getting cart Items",
      errMessage: err.errMessage,
    });
  }
};
const addCartItem = async (req, res) => {
  const cartItem = req.body;
  const newCartItem = new Cart(cartItem);
  try {
    const savedCartItem = await newCartItem.save();
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
  try {
    const { cartItem } = req;
    await cartItem.remove();
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
