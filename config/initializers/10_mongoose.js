var Path = require('path');
var Fs = require('fs');
var Mongoose = require('mongoose');
var ChangeCase = require('change-case');

var pathToModels = Path.join(__dirname, '..', '..', 'app', 'models');

module.exports = function() {
  Mongoose.connect(this.get('mongouri'));

  Fs.readdirSync(pathToModels).forEach(function(file) {
    var name = ChangeCase.pascalCase(Path.basename(file, '.js'));
    var module = Path.join(pathToModels, file);
    Mongoose.model(name, require(module));
  });
};
