const express = require("express");
const {
  productParamHandler,
} = require("../controllers/paramHandlers.controller");
const {
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../controllers/product.controller");
const productRouter = express.Router();

productRouter.route("/").get(getAllProducts);

productRouter.param("productId", productParamHandler);
productRouter.route("/:productId").get(getProductById).post(updateProduct);
module.exports = { productRouter };
