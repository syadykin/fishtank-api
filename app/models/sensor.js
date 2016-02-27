var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;
var Sensor = new Schema({
  tank: { type: Schema.Types.ObjectId, index: true },
  name:  String,
  value: Number
});

module.exports = Sensor;
