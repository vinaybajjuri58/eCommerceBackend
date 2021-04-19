const express = require("express");
const {
  getAllCategories,
  saveACategory,
} = require("../controllers/category.controller");
const categoryRouter = express.Router();
categoryRouter.route("/").get(getAllCategories).post(saveACategory);
module.exports = { categoryRouter };
