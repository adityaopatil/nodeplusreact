const mongoose = require("mongoose");
const config = require("config");
require("dotenv").config();

module.exports = function () {
  const mode = process.env.NODE_ENV;
  let db = "";
  if (mode === "development") {
    db = config.get("db");
  } else if (mode === "production") {
    // console.log("production");
    db = process.env.MONGODB_CONNECT_URI;
    // console.log(db);
  }

  mongoose
    .connect(db)
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
};
