const { Product } = require("../models/product.model");
const { Cart } = require("../models/cart.model");
const { Wishlist } = require("../models/wishlist.model");
const { Category } = require("../models/category.model");

const productParamHandler = async (req, res, next, productId) => {
  try {
    const product = await Product.findById(productId);
    req.product = product;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Error in getting product details",
      errMessage: err.errMessage,
    });
  }
};
const cartParamHandler = async (req, res, next, cartId) => {
  try {
    const cartItem = await Cart.findById(cartId);
    req.cartItem = cartItem;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Error in getting Cart Item details",
      errMessage: err.errMessage,
    });
  }
};
const wishlistParamHandler = async (req, res, next, wishlistId) => {
  try {
    const wishlistItem = await Wishlist.findById(wishlistId);
    req.wishlistItem = wishlistItem;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Error in getting wishlistItem  details",
      errMessage: err.errMessage,
    });
  }
};
const categoryParamHandler = async (req, res, next, categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    req.category = category;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Error in getting Category  details",
      errMessage: err.errMessage,
    });
  }
};
module.exports = {
  productParamHandler,
  cartParamHandler,
  wishlistParamHandler,
  categoryParamHandler,
};
