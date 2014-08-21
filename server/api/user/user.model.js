'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  password: String,
  token: String
});

module.exports = mongoose.model('User', UserSchema);
