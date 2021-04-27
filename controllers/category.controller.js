const { Category } = require("../models/category.model");
const { Product } = require("../models/product.model");
const mongoose = require("mongoose");

const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json({
    success: true,
    categories,
  });
};
const saveACategory = async (req, res) => {
  const category = req.body;
  const newCategory = new Category(category);
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category Added Successfully",
      category: savedCategory,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in creating a category",
      errMessage: err.errMessage,
    });
  }
};
const addProductToCategory = async (req, res) => {
  const productDetails = req.body;
  const { category } = req;
  const newProduct = new Product(productDetails);
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    const savedProduct = await newProduct.save({ session: sess });
    category.products.push(savedProduct._id);
    const updatedCategory = await category.save({ session: sess });
    await sess.commitTransaction();
    res.status(201).json({
      success: true,
      updatedCategory,
    });
  } catch (err) {}
};
module.exports = {
  getAllCategories,
  saveACategory,
  addProductToCategory,
};
