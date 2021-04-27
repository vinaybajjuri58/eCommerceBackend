const express = require("express");
const {
  getAllCategories,
  saveACategory,
  addProductToCategory,
} = require("../controllers/category.controller");
const {
  categoryParamHandler,
} = require("../controllers/paramHandlers.controller");
const categoryRouter = express.Router();
categoryRouter.route("/").get(getAllCategories).post(saveACategory);
categoryRouter.param("categoryId", categoryParamHandler);
categoryRouter.route("/:categoryId/products").post(addProductToCategory);
module.exports = { categoryRouter };
