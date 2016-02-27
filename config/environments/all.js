var LocomotiveMongoose = require('locomotive-mongoose');
var Path = require('path');

module.exports = function() {
  var appRoot = Path.join(__dirname, '..', '..');
  this.datastore(LocomotiveMongoose);
  this.set('mongouri', 'mongodb://localhost/fishtank-api');
  this.set('appRoot', appRoot);
  this.set('htmlRoot', Path.join(appRoot, 'public'));
  this.set('views', Path.join(appRoot, 'app', 'views'));
};
