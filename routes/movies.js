const express = require("express");
const router = express.Router();
const { validateMovie, Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.get("/", async (req, res) => {
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send("Movie with given id doesnot exists");

  res.send(movie);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    liked: req.body.liked,
  });

  await movie.save();
  res.send({
    title: movie.title,
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
    liked: movie.liked,
    genreId: movie.genre._id,
  });
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid Genre");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
      liked: req.body.liked,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("Movie with given id is not available");

  res.send(movie);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send("Movie with given id is not available");
    }
    res.send(movie);
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
