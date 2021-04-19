const { Category } = require("../models/category.model");
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
  const savedCategory = newCategory.save();
  res.status(201).json({
    success: true,
    message: "Category Added Successfully",
    category: savedCategory,
  });
};
module.exports = {
  getAllCategories,
  saveACategory,
};
