const config = require("config");
require("dotenv").config();

module.exports = function () {
  if (!process.env.vidly_jwtPrivateKey && !config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
  if (!process.env.vidly_db && !config.get("db")) {
    throw new Error("FATAL ERROR: db is not defined.");
  }
};
