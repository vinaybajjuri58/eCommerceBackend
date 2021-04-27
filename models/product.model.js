const mongoose = require("mongoose");
const { Schema } = mongoose;
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
      required: "Add a category for the product",
    },
    inStock: {
      type: Boolean,
      required: "is the product in stock or not ?",
    },
    speedDelivery: {
      type: Boolean,
      required: "Is the product under speedDelivery ?",
    },
    imageUrl: {
      type: String,
      required: "Please add the image Url of product",
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
