//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//The controller is going to need the database event model:
const eventModel = require('../models/eventModel');

//Test function that will be deleted in the future:
exports.getAllEvents = function(req, res) {
    eventModel.find((err, events) => {
        if(err) res.send(err);
        else res.json(events);
    });
}

//Definition of GET operation for the event model:
exports.getEvents = function(req, res) {
    //The user id is retireved from the request body so only his/her events are returned:
    var userNick = req.params.userNickname;
    eventModel.find({userNickname: userNick},(err, events) => {
        if(err) res.send(err);
        else res.json(events);
    });
}

//Definition of POST operation for the event model:
exports.postEvent = function(req, res) {
    //The event json is retrieved from the request body so it can be saved in the database:
    var eventJson = req.body;
    eventModel.create(eventJson, (err) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + eventJson.eventId + ' created' });
    });
}

//Definition of PUT operation for the event model:
exports.putEvent = function(req, res) {
    //The event json is retrieved from  the request body, as well as it's id and the associated user:
    var eventJson = req.body;
    var reqEventId = eventJson.eventId;
    var reqUserNick = eventJson.userNickname;
    //The event whose id and user matches the request's ones is updated:
    eventModel.updateOne({eventId: reqEventId, userNickname: reqUserNick}, eventJson, (err, raw) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + reqEventId + ' updated' });
    });
}

//Definition of DELETE operation for the event model:
exports.deleteEvent = function(req, res) {
    //The event json is retrieved from  the request body, as well as it's id and the associated user:
    var eventJson = req.body;
    var reqEventId = eventJson.eventId;
    var reqUserNick = eventJson.userNickname;  
    //The event whose id and user matches the request's ones is deleted:
    eventModel.deleteOne({eventId: reqEventId, userNickname: reqUserNick}, (err) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + reqEventId + ' deleted' });
    });
}