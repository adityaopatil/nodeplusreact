const Joi = require("joi");

module.exports = function () {
  Joi.objectId = require("joi-objectid")(Joi);
};

//require("joi-objectid") returns a function so
//we call this function and pass reference to
//Joi module. objectId is a method in Joi object
