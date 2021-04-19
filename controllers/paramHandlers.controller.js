const { Category } = require("../models/category.model");
const { Product } = require("../models/product.model");
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
const categoryParamHandler = async (req, res, next, categoryId) => {
  try {
    const category = await Category.findById(categoryId);
    req.category = category;
    next();
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "Error in getting product details",
      errMessage: err.errMessage,
    });
  }
};
module.exports = {
  productParamHandler,
  categoryParamHandler,
};
