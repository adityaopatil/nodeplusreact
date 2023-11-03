// const winston = require("winston");
module.exports = function (err, req, res, next) {
  //So whenever an error comes will log it inside the file
  //here we also need to set a logging level
  //   winston.error(err.message, err);
  //levels of errors
  //error
  //warnings
  //info
  //verbose
  //debug
  //silly
  res.status(500).send("Something Failed");
};
