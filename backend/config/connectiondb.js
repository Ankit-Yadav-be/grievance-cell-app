const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectiondb = async () => {
  try {
    const res = await mongoose.connect(process.env.MONGO_URL);
    if (res) {
      console.log("mongodb connection is successfull...",process.env.PORT );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectiondb;
