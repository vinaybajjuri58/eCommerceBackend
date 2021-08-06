const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const { productRouter } = require("./routes/product.routes");
const { categoryRouter } = require("./routes/category.routes");
const { cartRouter } = require("./routes/cart.routes");
const { wishlistRouter } = require("./routes/wishlist.routes");
const { userRouter } = require("./routes/user.routes");
const { errorHandler, pathNotFound } = require("./middleware/errorHandlers");
const { authValidator } = require("./middleware/authValidator");
const { initialiseDBConnection } = require("./db/db.connect");
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", authValidator, cartRouter);
app.use("/api/wishlist", authValidator, wishlistRouter);
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
