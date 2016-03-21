'use strict';

var File = require('../models/file');
var User = require('../models/user')
var fs = require('fs');
var express = require('express');
var fileRouter = express.Router();
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

s3.listBuckets(function(err, data) {
 if (err) { console.log("Error:", err); }
 else {
   for (var index in data.Buckets) {
     var bucket = data.Buckets[index];
     console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
});

fileRouter.post('/:user', (req, res) => {
  console.log('file S3 POST route hit');
  var userId = req.params.user;
  var params = {Bucket: 'deezfiles', Key: req.body.fileName, Body: req.body.body};
  var url;

  s3.upload(params, function(err, data) {
    if (err)
      console.log(err)
    else
      console.log('Successfully uploaded');
      url = data.Location;
      var file = new File(
        {
          fileName: req.body.fileName,
          body: req.body.body,
          url: url
        }
      );
      file.save(function(err, data) {
        if (err) {
          console.log(err);
          res.status(500).json(err);
        }
        User.update(
          { _id: userId },
          { $push: { _files: data._id} }, function(err, user) {
          if (err) {
            return res.status(500).json({msg: err});
          }
        });
        res.json(data);
      });
  });
});

module.exports = fileRouter;

