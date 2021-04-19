const mongoose = require("mongoose");
const initialiseDBConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vinay:neogCluster@123@cluster0.rb4jo.mongodb.net/demoCluster?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("DB connected successfully");
  } catch (err) {
    console.log("Error in establishing db connection");
  }
};
module.exports = {
  initialiseDBConnection,
};
