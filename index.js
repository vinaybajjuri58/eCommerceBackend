const express = require("express");
const app = express();
require("dotenv").config();
const { productRouter } = require("./routes/product.routes");
const { cartRouter } = require("./routes/cart.routes");
const { wishlistRouter } = require("./routes/wishlist.routes");
const { errorHandler, pathNotFound } = require("./middleware/errorHandlers");
const { initialiseDBConnection } = require("./db/db.connect");
app.use(express.json());
const PORT = 3000;
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);
// errorHandler
app.use(errorHandler);
// path not found handler
app.use(pathNotFound);

initialiseDBConnection();
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
