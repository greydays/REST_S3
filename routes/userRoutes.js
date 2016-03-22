'use strict';

var User = require('../models/user');
var File = require('../models/file');
var express = require('express');

module.exports = (router) => {

  // get all users
  router.get('/users', (req, res) => {
    console.log('users GET ALL route hit');
    User.find({}, function(err, data) {
      if (err) {
        res.status(500).json({msg: 'Internal Server Error'});
      }
      res.json(data);
    });
  })
  //get user and all files associated with a user
  .get('/users/:user', (req, res) => {
    var userId = req.params.user;
    console.log('users GET one route hit');
    User.findOne({_id: userId})
      .populate('_files')
      .exec(function (err, user) {
        if (err) return handleError(err);
        res.json(user);
    });
  })
  // creates new user
  .post('/users', (req, res) => {
    console.log('users POST route hit');
    var user = new User(req.body);
    user.save(function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      }
      res.json(data);
    });
  })
  //updates a specific user
  .put('/users/:user', (req, res) => {
    console.log('users PUT route hit');
    var userId = req.params.user;
    var newUserInfo = req.body;
    User.update({_id: userId}, newUserInfo, function(err, user) {
      if (err) {
        return res.status(500).json({msg: err});
      }
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({msg: 'Unable to locate ' + userID});
      }
    });
  })
  //deletes specific user
  .delete('/users/:user', (req, res) => {
    console.log('/users DELETE route hit');
    var userId = req.params.user;
    User.findOne({_id: userId}, function(err, doc) {
      if (err){
        res.status(500).json(err);
      }
      doc.remove();
      res.json({msg: 'User was removed'});
    });
  });

};

