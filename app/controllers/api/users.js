var a$ = require('async');
var HttpErrors = require('http-errors');
var Locomotive = require('locomotive');
var Passport = require('passport');

var Controller = Locomotive.Controller;
var Ctrl = new Controller();

var Render = function(err, data) {
  var that = this;
  this.respond({
    json: function() {
      var body = err ? err.body || {
          code: err.status || 500,
          message: err.message
      } : data || {};
      if (err) that.res.status(err.status || 500);
      that.res.json(body);
    }
  });
};

Ctrl.auth = function() {
  a$.waterfall([
    a$.constant(this),
    function(that, cb) {
      switch(that.req.method) {
        case 'POST':
          Passport.authenticate('json', function(err, user, message, code) {
            cb(err || message && HttpErrors(message, code), user);
          })(that.req, that.res);
          break;

        case 'DELETE':
          that.req.logOut(cb);
          break;

        default:
          cb(HttpErrors(404));
      }
    },
    function(respose, cb) {
      console.log(respose);
      cb();
    }
  ], Render.bind(this));
};

module.exports = Ctrl;
