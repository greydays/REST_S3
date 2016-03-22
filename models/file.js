var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user')

var fileSchema = new Schema({
  fileName: String,
  body: String,
  url: String,
  ETag: String
});

module.exports = mongoose.model('File', fileSchema);

