'use strict'

const user = require('../models/userModel');

exports.postUser = function(req, res) {
    var userJson = req.body;
    user.create(userJson, (err) => {
        if(err) res.send(err);
        else res.json({ message: 'User ' + userJson.nickname + ' created'});
    });
}

exports.getUser = function(req, res) {
    user.find((err, users) => {
        if(err) res.send(err);
        else res.json(users);
    });
}

exports.deleteUser = function(req, res) { 
    user.deleteOne({nickname: req.params.nickname}, (err) => {
          if (err) res.send(err);
          else res.json({ message: 'User ' + req.params.nickname + ' deleted'});
    });
}