const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("../models/genre");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    genre: { type: genreSchema, required: true }, //Passing our mongoose genre schema
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
    liked: {
      type: Boolean,
    },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().required().min(1).max(50),
    genreId: Joi.string().required(), //Here we only need the ID of genre not the genre document
    numberInStock: Joi.number().required().max(100),
    dailyRentalRate: Joi.number().required().max(100),
    liked: Joi.boolean(),
  });

  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validateMovie = validateMovie;
