const { extend } = require("lodash");
const { Product } = require("../models/product.model");
const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json({
    success: true,
    products,
  });
};

const getProductById = (req, res) => {
  res.json({
    success: true,
    product: req.product,
  });
};
const updateProduct = async (req, res) => {
  let { product } = req;
  const updateProduct = req.body;
  product = extend(product, updateProduct);
  const updatedProduct = await product.save();
  res.json({
    success: true,
    product: updatedProduct,
  });
};
module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
};
