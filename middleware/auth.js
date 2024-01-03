const jwt = require("jsonwebtoken");
const config = require("config");

//Creating a middleware function
function auth(req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  //So if there is a token we need to verify if its a valid token
  try {
    //we use config module to read the private key from our env variable
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded; //We get the decoded token and we pass it to the user obj
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
