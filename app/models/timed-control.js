var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;
var TimedControl = new Schema({
  tank: { type: Schema.Types.ObjectId, index: true },
  name: String,
  type: Number,
  id: Number,
  start: Number,
  stop: Number
});

module.exports = TimedControl;
