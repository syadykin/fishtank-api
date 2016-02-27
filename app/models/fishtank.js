var Mongoose = require('mongoose');

var Schema = Mongoose.Schema;
var Fishtank = new Schema({
  mac:  String,
  user: { type: Schema.Types.ObjectId, index: true },
  controls: [Number]
});

module.exports = Fishtank;
