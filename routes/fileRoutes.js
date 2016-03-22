'use strict';

var File = require('../models/file');
var User = require('../models/user')
var express = require('express');
var AWS = require('aws-sdk');
var s3 = new AWS.S3();

module.exports = (router) => {

  // example code from AWS api - used to verify connection to s3
  s3.listBuckets(function(err, data) {
   if (err) { console.log("Error:", err); }
   else {
     for (var index in data.Buckets) {
       var bucket = data.Buckets[index];
       console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
      }
    }
  });

  router.post('/file/:user', (req, res) => {
    console.log('file S3 POST route hit');
    var userId = req.params.user;
    var params = {
                  Bucket: 'deezfiles',
                  Key: req.body.fileName,
                  Body: req.body.body
                };
    var url;
    //checks to see if filename already exists
    s3.getObject({ Bucket: 'deezfiles', Key: req.body.fileName }, function(err, data) {
      if (data) {
        console.log('filename already exists');
        res.status(500).send('filename already exists');
      } else { //uloads file to s3
        s3.upload(params, function(err, data) {
          if (err)
            console.log(err)
          else
            console.log('Successfully uploaded');
            var file = new File(
              {
                fileName: req.body.fileName,
                body: req.body.body,
                url: data.location,
                ETag: data.ETag
              }
            ); //saves new file doc
            file.save(function(err, data) {
              if (err) {
                console.log(err);
                res.status(500).json(err);
              }
              User.update( //adds file ref to user
                { _id: userId },
                { $push: { _files: data._id} }, function(err, user) {
                if (err) {
                  return res.status(500).json({msg: err});
                }
              });
              res.json(data);
            });
        });
      }
    });
  })

  .delete('/files/:user/:file', (req, res) => {
    var userId = req.params.user;
    var fileId = req.params.file;
  })


};

