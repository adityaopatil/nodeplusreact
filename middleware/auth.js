const jwt = require("jsonwebtoken");
const config = require("config");

//Creating a middleware function
module.exports = function (req, res, next) {
  // if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  //So if there is a token we need to verify if its a valid token
  try {
    //we use config module to read the private key from our env variable
    let privateKey = process.env.jwtPrivateKey || config.get("jwtPrivateKey");
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded;
    //We get the decoded token and we pass it to the user obj or the request
    next(); //Here the next processing pipeline is our route handler
  } catch (ex) {
    res.status(400).send("Invalid token", ex);
  }
};
