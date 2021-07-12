const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: "Add quantity to the cartItem",
  },
});

const Cart = mongoose.model("Cart", cartItemSchema);
module.exports = { Cart };
