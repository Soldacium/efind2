const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/your-db";

mongoose
  .connect(uri)
  .then(() => console.log(" Mongoose connected"))
  .catch((err) => console.error(" Mongoose connection error:", err));

module.exports = mongoose;
