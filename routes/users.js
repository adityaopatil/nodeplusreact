const auth = require("../middleware/auth"); //Here auth means Authorization
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { validateUser, User } = require("../models/user");
const express = require("express");
const router = express.Router();

//To get the current user we can have an api endpoint like me
//with this the client is not going to send the id we are going to get
//it from the JSON web token.
router.get("/:id", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password"); //we exclude  the password
  res.send(user);
});

router.post("/", async (req, res) => {
  const result = validateUser(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  console.log(user);
  //When I do console.log here I get complete user obj name,_id,email,isAdmin

  const token = user.generateAuthToken();

  //When I print this token and pass it through JSON webtoken it is only showing isAdmin and iat
  //Why?
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email", "isAdmin"]));
});

// router.put("/:id", async (req, res) => {
//   const result = validateGenre(req.body);
//   if (result.error)
//     return res.status(400).send(result.error.details[0].message);
//   const genre = await Genre.findByIdAndUpdate(req.params.id, {
//     name: req.body.name,
//     new: true,
//   });

//   if (!genre)
//     return res.status(404).send("Movie with this genre is not available");

//   res.send(genre);
// });

// router.delete("/:id", async (req, res) => {
//   const genre = await Genre.findByIdAndRemove(req.params.id);
//   if (!genre)
//     return res.status(404).send("Movie with this genre is not available");

//   res.send(genre);
// });

module.exports = router;
