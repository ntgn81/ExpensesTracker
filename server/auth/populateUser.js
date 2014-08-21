var express = require('express');
var config = require('../config/environment');
var User = require('../api/user/user.model');

module.exports = function(req, res, next) {
  var pathName = req._parsedUrl.pathname;

  User.findById(req.query.token, function (err, user) {

    if (err || !user) {
      return res.send(401);
    }

    req.user = {
      _id: req.query.token
    }
    next();    
  })
}