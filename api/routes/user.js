// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var express = require('express');
var router = express.Router();

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Using the passport.authenticate middleware with our local strategy.
// If the user has valid login credentials, send them to the members page.
// Otherwise the user will be sent an error
router.post("/login", passport.authenticate("local"), function(req, res) {
  console.log(`User: ${req.body.email} is logged in!`);
  //res.json();
  res.sendStatus(200);
});
//
// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/signup", function(req, res) {
  console.log(`Try to create user: ${req.body.email}`);
  db.User.create({
    email: req.body.email,
    password: req.body.password
  }).then(function() {
    res.redirect(307, "/");
  }).catch(function(err) {
    console.log(err);
    res.json(err);
    // res.status(422).json(err.errors[0].message);
  });
});
//
// Route for logging user out
router.get("/logout", function(req, res) {
  console.log(`Logging out user: ${req.user.email}`)

  req.logout();
  res.sendStatus(200);
});
//
// Route for getting some data about our user to be used client side
router.get("/data", isAuthenticated, function(req, res) {

  console.log(`session: ${req.session}`);
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  }
  else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  }
});


module.exports = router;