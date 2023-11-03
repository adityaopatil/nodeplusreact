require("express-async-errors");
const winston = require("winston"); //This logger obj has a transport
const express = require("express");

const app = express();

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();
require("./startup/prod")(app);

//Adding another transport for logging messages in file
// winston.add(winston.transports.File, { filename: "logfile.log" });

//This process obj is an eventemitter(Eventemitter publish events)
process.on("uncaughtException", (ex) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION");
  winston.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  console.log("WE GOT AN Unhandled EXCEPTION");
  winston.error(ex.message, ex);
  process.exit(1);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}....`));
