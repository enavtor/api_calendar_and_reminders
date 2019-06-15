//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//Express router and the user controller are imported to define the CRUD operations routes:
const express = require('express');
const eventController = require('../controllers/eventController');

const eventRute = express.Router();

//Each operation route is specified along with the controller's function that defines its functionality:
eventRute.get('/all', eventController.getAllEvents);
eventRute.get('/:userId', eventController.getEvents);
eventRute.post('/', eventController.postEvent);
eventRute.put('/', eventController.putEvent);
eventRute.delete('/', eventController.deleteEvent);

//Now the event route is exported so the app module can use it:
module.exports = eventRute;