const config = require("config");

module.exports = function (req, res, next) {
  //401 Unauthorized
  //403 Forbidden
  if (!config.get("requiresAuth")) return next();

  if (!req.user.isAdmin)
    //Here we are assuming that this func is executed after auth middlware funct
    //our auth middleware function sets req.user so we can access that it in this func
    //

    return res.status(403).send("Access Denied");
  //Now if the user isAdmin we pass func to the next middlware func
  // i.e. routes
  next();
};
