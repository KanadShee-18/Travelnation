const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB Connected ...");
    })
    .catch((error) => {
      console.log("DB connection failed.");
      console.log("DB error: ", error);
    });
};
