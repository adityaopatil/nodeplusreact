const jwt = require("jsonwebtoken");
const config = require("config");
const mongoose = require("mongoose");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

const complexityOptions = {
  min: 8, // Minimum password length
  max: 30, // Maximum password length
  lowerCase: 1, // Require at least 1 lowercase letter
  upperCase: 1, // Require at least 1 uppercase letter
  numeric: 1, // Require at least 1 numeric character
  symbol: 1, // Require at least 1 special character
  requirementCount: 4, // Total number of requirements to satisfy
};

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    //Here we also call the email method to make sure its a valid email
    password: passwordComplexity(complexityOptions).required(),
    isAdmin: Joi.boolean().required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;
