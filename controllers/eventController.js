'use strict'

const eventModel = require('../models/eventModel');

exports.getEvents = function(req, res) {
    eventModel.find((err, events) => {
        if(err) res.send(err);
        else res.json(events);
    });
}

exports.postEvent = function(req, res) {
    var eventJson = req.body;
    eventModel.create(eventJson, (err) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + eventJson.eventId + ' created' });
    });
}

exports.putEvent = function(req, res) {
    var eventJson = req.body;
    var id = req.params.eventId;
    eventModel.update({eventId: id}, eventJson, (err, raw) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + id + ' updated' });
    });
}

exports.deleteEvent = function(req, res) {
    var id = req.params.eventId;
    eventModel.deleteOne({eventId: id}, (err) => {
        if(err) res.send(err);
        else res.json({ message: 'Event ' + id + ' deleted' });
    });
}