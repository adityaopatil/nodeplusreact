const mongoose = require("mongoose");
const Joi = require("joi");

//Creating a Schema for customer
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    phone: { type: String, required: true, minlength: 10, maxlength: 10 },
    isGold: {
      type: Boolean,
      default: false,
    },
  })
);

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(50),
    phone: Joi.string().required().length(10),
    isGold: Joi.boolean(),
  });

  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
