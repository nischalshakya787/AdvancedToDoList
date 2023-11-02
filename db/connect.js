const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url); //mongoose.connect is a promise
};

module.exports = connectDB;
