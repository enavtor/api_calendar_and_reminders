//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//The controller is going to need the database event model:
const eventModel = require('../models/eventModel');

//Definition of GET operation for the event model:
exports.getEvents = function(req, res) {
    //The user id is retireved from the request body so only his/her events are returned:
    var id = req.params.userId;
    eventModel.find({userId: id},(err, events) => {
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
    var reqUserId = eventJson.userId;
    //The event whose id and user matches the request's ones is updated:
    eventModel.update({eventId: reqEventId, userId: reqUserId}, eventJson, (err, raw) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + id + ' updated' });
    });
}

//Definition of DELETE operation for the event model:
exports.deleteEvent = function(req, res) {
    //The event json is retrieved from  the request body, as well as it's id and the associated user:
    var eventJson = req.body;
    var reqEventId = eventJson.eventId;
    var reqUserId = eventJson.userId;  ç
    //The event whose id and user matches the request's ones is deleted:
    eventModel.deleteOne({eventId: reqEventId, userId: reqUserId}, (err) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + id + ' deleted' });
    });
}