const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  mongoose
    .connect(config.get("db"))
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB...", err));
};
//"mongodb+srv://patiladi3119:AdityaPatil31@clusterreactproject.bzfqgnw.mongodb.net/?retryWrites=true&w=majority"
//"mongodb+srv://patiladi3119:Adityapatil31@clusterreactproject.bzfqgnw.mongodb.net/?retryWrites=true&w=majority"
