const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Category } = require("./category.model");
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: "Add a name to the product",
    },
    price: {
      type: Number,
      required: "Add price to the product",
    },
    description: {
      type: String,
      required: "Add a decription to the product",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
