const winston = require("winston"); //This logger obj has a transport
require("express-async-errors");

module.exports = function () {
  //Adding another transport for logging messages in file
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  //This process obj is an eventemitter(Eventemitter publish events)
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({
      filename: "logfile.log",
      level: "info",
    })
  );
};
