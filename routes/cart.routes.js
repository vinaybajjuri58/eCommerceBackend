const express = require("express");
const {
  getAllCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cart.controller");
const { cartParamHandler } = require("../controllers/paramHandlers.controller");
const cartRouter = express.Router();
cartRouter.route("/").get(getAllCartItems).post(addCartItem);
cartRouter.param("cartId", cartParamHandler);
cartRouter.route("/:cartId").post(updateCartItem).delete(deleteCartItem);

module.exports = { cartRouter };
