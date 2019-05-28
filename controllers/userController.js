'use strict'

const userModel = require('../models/userModel');

exports.getUser = function(req, res) {
    userModel.find((err, users) => {
        if(err) res.send(err);
        else res.json(users);
    });
}

exports.postUser = function(req, res) {
    var userJson = req.body;
    userModel.create(userJson, (err) => {
        if(err) res.send(err);
        else res.json({ message: 'User ' + userJson.nickname + ' created'});
    });
}

exports.deleteUser = function(req, res) { 
    var userNickname = req.params.nickname;
    userModel.deleteOne({nickname: userNickname}, (err) => {
          if (err) res.send(err);
          else res.json({ message: 'User ' + userNickname + ' deleted'});
    });
}