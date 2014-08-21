'use strict';

var express = require('express');
var config = require('../config/environment');
var User = require('../api/user/user.model');

var router = express.Router();

//router.use('/local', require('./local'));
router.get('/', function(req, res, next) {
  var email = req.query.email,
    password = req.query.password;
  User.findOne({
    email: email.toLowerCase()
  }, function(err, user) {
    if (err) return res.json(401, err);    

    if (!user) {
      return res.json(401, { message: 'This email is not registered.' });
    }
    if (user.password !== password) {
      return res.json(401, { message: 'This password is not correct.' });
    }

    return res.json({token: user._id});
  });
});

// create new user
router.post('/', function(req, res, next) {
  User.findOne({
    email: req.body.email.toLowerCase()
  }, function(err, user) {
    if (err) return res.json(401, err);    

    if (user) {
      return res.json(409, { message: 'This email is already in use.' });
    }

    User.create(req.body, function(err, newUser) {
      if(err) { return res.json(422, err); }
      return res.json(201, {token: newUser._id});
    });
  });
});

module.exports = router;