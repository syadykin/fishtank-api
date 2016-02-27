var a$ = require('async');
var Bcrypt = require('bcrypt');
var HttpErrors = require('http-errors');
var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;
var User = new Schema({
  email: String,
  password: String,
  salt: String,
  name: String
});

User.statics.authenticate = function(email, password, cb) {
  a$.auto({
    user: this.findOne.bind(this, {email: email}),
    validate: ['user', function(cb, res) {
      if (!res.user ) return cb();
      Bcrypt.compare(password + res.user.salt, res.user.password, cb);
    }]
  }, function(err, res) {
    cb(err || !res.user && new HttpErrors('Wrong Password', 401), res.user);
  });
};

module.exports = User;
