const express = require("express");
const app = express();
const { productRouter } = require("./routes/product.routes");
const { errorHandler, pathNotFound } = require("./middleware/errorHandlers");
const { initialiseDBConnection } = require("./db/db.connect");
app.use(express.json());
const PORT = 3000;
app.use("/products", productRouter);
// errorHandler
app.use(errorHandler);
// path not found handler
app.use(pathNotFound);

initialiseDBConnection();
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
