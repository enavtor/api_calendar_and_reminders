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
    eventModel.create(eventJson, (err, newEvent) => {
        if (err) res.send(err);
        else {
            //If the event is successfully saved, its field eventId is overwritten with the id assigned by mongo:
            var localId = eventJson.eventId;
            eventJson.eventId = newEvent._id;
            const responseMessage = 'Event ' + localId + ' created';
            updateEvent(localId, eventJson.userId, eventJson, responseMessage, res);
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
    const responseMessage = 'Event ' + reqEventId + ' updated';
    updateEvent(reqEventId, reqUserId, eventJson, responseMessage, res);
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

//Method that encapsulates the functionality to update an event:
const updateEvent = function(reqEventId, reqUserId, eventJson, message, response) {
    var responseJson;
    //The params to identify the event that wil be updated include the event's and user's ids:
    var queryParams = {
        eventId: reqEventId, 
        userId: reqUserId
    };
    //The event will be updated, returning a specific response depending on the opertion success:
    eventModel.updateOne(queryParams, eventJson, (err) => {
        if(err) responseJson = {error: err};
        else {
            responseJson = {
                message: message,
                eventId: eventJson.eventId,
                eventLastUpdate: eventJson.eventLastUpdate
            };
        }
        //Since updateOne is an asynchronous function, the response must be sent 
        //from the callback, and not from the function that invoked this method:
        response.json(responseJson);
    });
}