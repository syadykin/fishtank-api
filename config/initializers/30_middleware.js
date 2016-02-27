var BodyParser = require('body-parser');
var Config = require('../../config.json');
var Express = require('express');
var Js = require('../../app/middleware/js');
var Less = require('less-middleware');
var MethodOverride = require('method-override');
var Path = require('path');
var Passport = require('passport');

var LocalStrategy = require('passport-json').Strategy;
var User = require('mongoose').models.User;

module.exports = function() {
  var appRoot = this.get('appRoot');
  if ('development' === this.env) {
    this.use(Js(appRoot, Config.js));
    this.use(Express.logger());
    this.use(Less(Path.join(appRoot, 'assets'), Config.less));
    this.use(Express.static(this.get('htmlRoot')));
    this.use(Express.favicon());
    this.use('/fonts',
          Express.static(Path.join(appRoot, 'node_modules', 'bootstrap', 'fonts')));
  }

  // parsers
  this.use(Express.cookieParser());
  this.use(BodyParser.json());

  Passport.use(new LocalStrategy({
    usernameProp: 'email',
    passwordProp: 'password'
  }, function() {
    // this must be this way because of undetermined nature durin startup
    User.authenticate.apply(User, arguments);
  }));

  Passport.serializeUser(function(user, cb) {
    console.log('serializeUser');
    cb(null, user.id);
  });

  Passport.deserializeUser(function(id, cb) {
    console.log('serializeUser');
    User.find({id: id}, cb);
  });

  this.use(Passport.initialize());
  this.use(Passport.session());
  this.use(MethodOverride());
  this.use(this.router);
  this.use(Express.errorHandler());
};
