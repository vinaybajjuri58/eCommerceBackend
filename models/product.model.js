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
      type: String,
      required: "Add a category for the product",
    },
    inStock: {
      type: Schema.Types.Boolean,
      required: "is the product in stock or not ?",
    },
    speedDelivery: {
      type: Schema.Types.Boolean,
      required: "Is the product under speedDelivery ?",
    },
    imageUrl: {
      type: Schema.Types.String,
      required: "Please add the image Url of product",
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = { Product };
