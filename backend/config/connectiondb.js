const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectiondb = async () => {
  try {
    const res = await mongoose.connect("mongodb://localhost:27017/collage");
    if (res) {
      console.log("mongodb connection is successfull...",process.env.PORT );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectiondb;
