const express = require("express");
const router = express.Router();
const { validate, Customer } = require("../models/customer");
const auth = require("../middleware/auth");

//creating routes using express
router.get("/", auth, async (req, res) => {
  const customers = await Customer.find().sort("name");

  res.send(customers);
});

router.get("/:id", auth, async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res.status(404).send("Customer with given id doesnot exists");

  res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });

  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );

  if (!customer)
    return res.status(404).send("Customer with given id is not available");

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res.status(404).send("Customer with this id is not available");

  res.send(customer);
});

module.exports = router;
