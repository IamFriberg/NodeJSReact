// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
      console.log("User is logged in.");
      return next();
    }
    console.log("User is not logged in.");
    // If the user isn't' logged in, return http unauthorized
    return res.sendStatus(401);
  };