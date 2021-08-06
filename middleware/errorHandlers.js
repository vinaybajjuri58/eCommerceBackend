const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Error occured see the errMessage for more details",
    errMessage: err.errMessage,
  });
};
const pathNotFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Path not found on server please check",
  });
};
module.exports = {
  errorHandler,
  pathNotFound,
};
