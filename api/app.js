// Requiring necessary npm packages
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
//
// Requiring models for syncing
var db = require("./models");
//
// Creating express app and configuring middleware needed for authentication
console.log("Creating express app and configuring middleware needed for authentication");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

console.log("sessions to keep track of our user's login status");
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

console.log("Requiring our routes");
//
// Requiring our routes
var htmlRouter = require('./routes/html-routes');
var usersRouter = require('./routes/api-routes');
var userRouter = require('./routes/user');
var testAPIRouter = require('./routes/testAPI');

//Add CORS to our API to allow cross-origin requests.
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
  }));

app.use('/', htmlRouter);
app.use('/', usersRouter);
app.use('/user', userRouter);
app.use('/testAPI', testAPIRouter);

//
// Syncing our database and logging a message to the user upon success
console.log("Syncing our database");
db.sequelize.sync();

module.exports = app;

