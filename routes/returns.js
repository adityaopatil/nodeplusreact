const moment = require("moment");
const auth = require("../middleware/auth");
const { Rental } = require("../models/rental");
const express = require("express");
const { Movie } = require("../models/movie");
const Joi = require("joi");
const router = express.Router();
const validate = require("../middleware/validate");

router.post("/", [auth, validate(validateReturn)], async (req, res, next) => {
  const rental = await Rental.findOne({
    "customer._id": req.body.customerId,
    "movie._id": req.body.movieId,
  });

  //   console.log(rental);

  if (!rental) return res.status(404).send("Rental not found");

  if (!rental.dateReturned)
    return res.status(400).send("Return already processed");

  rental.dateReturned = new Date();
  const rentalDays = moment().diff(rental.dateOut, "days"); //How many days apart
  rental.rentalFee = rentalDays * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.updateOne(
    { _id: rental.movie._id },
    {
      $inc: { numberInStock: 1 },
    }
  );

  return res.status(200).send(rental);
});

function validateReturn(req) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });
  return schema.validate(req);
}

module.exports = router;
