'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// var path = require('path');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

var userRouter = require(__dirname + '/routes/userRoutes');
var fileRouter = require(__dirname + '/routes/fileRoutes');
app.use('/users', userRouter);
app.use('/file', fileRouter);

app.listen(port, function() {
  console.log('Server listening on port ' + (port || 3000));
});



