const express = require("express");
const { Product } = require("../models/product.model");
const productRouter = express.Router();
productRouter
  .route("/")
  .get(async (req, res) => {
    const products = await Product.find({});
    res.json({
      success: true,
      products,
    });
  })
  .post(async (req, res) => {
    1;
    const productDetails = req.body;
    const newProduct = new Product(productDetails);
    const savedProduct = await newProduct.save();
    res.status(201).json({
      success: true,
      product: savedProduct,
    });
  });
productRouter.param("productId", async (req, res, next, productId) => {
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
});
productRouter.route("/:productId").get((req, res) => {
  res.json({
    success: true,
    product: req.product,
  });
});
module.exports = { productRouter };
