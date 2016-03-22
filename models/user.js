var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var File = require('./file')
var bcrypt = require('bcrypt');


var userSchema = new Schema({
  name: String,
  _files: [{type: Schema.Types.ObjectId, ref: 'File'}]
});

module.exports = mongoose.model('User', userSchema);


