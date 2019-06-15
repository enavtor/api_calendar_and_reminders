//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//The controller is going to need the database user model:
const userModel = require('../models/userModel');
//The controller is also going to need the event model when deleting a user:
const eventModel = require('../models/eventModel');

//Test function that will be deleted in the future:
exports.getAllUsers = function(req, res) {
    userModel.find((err, users) => {
        if(err) res.send(err);
        else res.json(users);
    });
}

//Definition of GET operation for the user model:
exports.getUser = function(req, res) {
    //In order to get a specific user, his/her nickname and password are require:
    var reqUserNickname = req.params.nickname;
    var reqUserPassword = req.params.password;
    //Now the user is sought and returned if found:
    userModel.findOne({nickname: reqUserNickname, password: reqUserPassword}, (err, user) => {
        if(err) res.send(err);
        else res.json(user);
    });
}

//Definition of POST operation for the user model:
exports.postUser = function(req, res) {
    //First of all the user json is retrieved from the request body:
    var userJson = req.body;
    var reqUserNick = userJson.nickname;
    //Before creating a new user, it is necesary to check if its nickname already exist:
    userModel.findOne({nickname: reqUserNick}, (err, user) => {
        if(err) res.send(err);
        //If the new nickname is not found, the user is created:
        else if(user == null) {
            userModel.create(userJson, (err) => {
                if(err) res.send(err);
                else res.json({ message: 'User ' + reqUserNick + ' created'});
            });
        }
        //Otherwise, if the user exists, a message indicating that the nickname is in use is returned:
        else res.json({ message: 'Nickname ' + reqUserNick + ' already exists!!!'});
    });
}

//Definition of PUT operation for the user model:
exports.putUser = function(req, res) {
    //The user json and his/her id are retrieved from  the request body 
    //(the nickname is also retrieved in order to form the update message):
    var userJson = req.body;
    var reqUserId = userJson._id;
    var reqUserNick = userJson.nickname;
    //The user whose id matches the request's one is updated:
    userModel.updateOne({_id: reqUserId}, userJson, (err, raw) => {
        if(err) res.send(err);
        else res.json({ message: 'User ' + reqUserNick + ' updated' });
    });
}

//Definition of DELETE operation for the user model:
exports.deleteUser = function(req, res) { 
    //The user is deleted by his/her id:
    var userJson = req.body;
    var reqUserId = userJson._id;
    var reqUserNick = userJson.nickname;
    //Before deleting the user, all his/her events are deleted:
    eventModel.deleteMany({userId: reqUserId},  (err) => {
        if (err) res.send(err);
        //Once the user events habe been succesfully deleted, the user is deleted too:
        else {
            userModel.deleteOne({_id: reqUserId}, (err) => {
                if (err) res.send(err);
                else res.json({ message: 'User ' + reqUserNick + ' deleted'});
          });
        }
  }); 
}