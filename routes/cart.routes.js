const express = require("express");
const {
  getAllCartItems,
  addCartItem,
  updateCartItem,
} = require("../controllers/cart.controller");
const { cartParamHandler } = require("../controllers/paramHandlers.controller");
const cartRouter = express.Router();
cartRouter.route("/").get(getAllCartItems).post(addCartItem);
cartRouter.param("cartId", cartParamHandler);
cartRouter.route("/:cartId").post(updateCartItem);

module.exports = { cartRouter };
