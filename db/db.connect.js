const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;
const initialiseDBConnection = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error in establishing db connection");
    console.error(err);
  }
};
module.exports = {
  initialiseDBConnection,
};
