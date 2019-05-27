'use strict'

const express = require('express');
const eventController = require('../controllers/eventController');

const eventRute = express.Router();

eventRute.get('/', eventController.getEvent);
eventRute.post('/', eventController.postEvent);
eventRute.put('/:eventId', eventController.putEvent);
eventRute.delete('/:eventId', eventController.deleteEvent);

module.exports = eventRute;