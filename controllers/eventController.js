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
    var reqUserId = req.params.userId;
    eventModel.find({userId: reqUserId}, (err, events) => {
        if(err) res.send(err);
        else res.json(events);
    });
}

//Definition of POST operation for the event model:
exports.postEvent = function(req, res) {
    //The api's current date must be stored in order to set the 'eventLastUpdate' field:
    const currentDate = getCurrentDate();
    //The event json is retrieved from the request body so it can be saved in the database:
    var eventJson = req.body;
    eventJson.eventLastUpdate = currentDate;
    eventModel.create(eventJson, (err) => {
        if (err) res.send(err);
        else {
            const responseJson = {
                message: 'Event ' + eventJson.eventId + ' created',
                lastUpdate: currentDate
            };
            res.json(responseJson);
        }
    });
}

//Definition of PUT operation for the event model:
exports.putEvent = function(req, res) {
    //The api's current date must be stored in order to update the 'eventLastUpdate' field:
    const currentDate = getCurrentDate();
    //The event json is retrieved from  the request body, as well as it's id and the associated user:
    var eventJson = req.body;
    var reqEventId = eventJson.eventId;
    var reqUserId = eventJson.userId;
    eventJson.eventLastUpdate = currentDate;
    //The event whose id and user matches the request's ones is updated:
    eventModel.updateOne({eventId: reqEventId, userId: reqUserId}, eventJson, (err, raw) => {
        if(err) res.send(err);
        else {
            const responseJson = {
                message: 'Event ' + reqEventId + ' updated',
                lastUpdate: currentDate
            };
            res.json(responseJson);
        }
    });
}

//Definition of DELETE operation for the event model:
exports.deleteEvent = function(req, res) {
    //The event json is retrieved from  the request body, as well as it's id and the associated user:
    var eventJson = req.body;
    var reqEventId = eventJson.eventId;
    var reqUserId = eventJson.userId;  
    //The event whose id and user matches the request's ones is deleted:
    eventModel.deleteOne({eventId: reqEventId, userId: reqUserId}, (err) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + reqEventId + ' deleted' });
    });
}

//Simple method that returns the API's current date in milliseconds:
const getCurrentDate = function() {
    var currentDate = new Date();
    return currentDate.getTime();
}