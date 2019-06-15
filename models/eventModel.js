//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//Mongoose module and schema class are required in order to define the mongoDB event model:
const mongoose = require('mongoose');
const schema = mongoose.Schema;

//First the event's model structure is defined as a JSON:
const eventSchema = schema({
    eventId: Number,
    userId: String,
    eventType: String,
    eventText: String,
    eventStartDate: Number,
    eventPrevAlarms: String,
    eventRepInterval: Number,
    eventRepType: String,
    eventRepStopDate: Number,
});

//Now the model is exported so the corresponding controller can define the appropriate CRUD operations:
module.exports = mongoose.model('event', eventSchema)