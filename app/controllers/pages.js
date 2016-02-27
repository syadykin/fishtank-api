var Locomotive = require('locomotive');

var Controller = Locomotive.Controller;
var Ctrl = new Controller();

Ctrl.index = function() {
  this.render('./main');
};

module.exports = Ctrl;
