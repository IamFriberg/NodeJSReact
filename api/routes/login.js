var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/login', 
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true })
);

module.exports = router;