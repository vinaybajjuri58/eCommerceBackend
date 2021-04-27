const express = require("express");
const app = express();
require("dotenv").config();
const { productRouter } = require("./routes/product.routes");
const { categoryRouter } = require("./routes/category.routes");
const { cartRouter } = require("./routes/cart.routes");
const { wishlistRouter } = require("./routes/wishlist.routes");
const { errorHandler, pathNotFound } = require("./middleware/errorHandlers");
const { initialiseDBConnection } = require("./db/db.connect");
app.use(express.json());
const PORT = 3000;
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
app.use("/categories", categoryRouter);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to backend of ecommerce app",
  });
});
// errorHandler
app.use(errorHandler);
// path not found handler
app.use(pathNotFound);

initialiseDBConnection();
app.listen(process.env.PORT || PORT, () => {
  console.log("Server started on port ", PORT);
});
