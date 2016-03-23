'use strict';

var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;
var request = chai.request;
var User = require('../models/user');

process.env.MONGOLAB_URI = 'mongodb://localhost/test';
require('../app.js');

describe('user post route', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  it('should post a user', function(done)  {
    request('localhost:3000')
    .post('/users')
    .send({name: 'testName'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('testName');
      expect(res.body).to.have.property('_id');
      done();
    });
  });
  it('should delete a user', function(done) {
    User.findOne({name: 'testName'}, function(err, user) {
      if (err) res.status(500).json(err);
      request('localhost:3000')
      .delete('/users/' + user._id)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.eql({msg: 'User was removed'});
        done();
      });
    });
  });
});
