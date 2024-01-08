const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const validateObjectId = require("../middleware/validateObjectId");
const { validateGenre, Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  // throw new Error("Could not get Genres");
  const genres = await Genre.find().sort("genre");
  res.send(genres);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("Movie with this genre id is not available");

  res.send(genre);
});

router.post("/", auth, async (req, res) => {
  console.log(req.body);
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();

  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  console.log();
  const result = validateGenre(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!genre)
    return res.status(404).send("Movie with this genre is not available");

  res.send(genre);
});

//Here we add 2 middleware func
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("Movie with this genre is not available");

  res.send(genre);
});

module.exports = router;
