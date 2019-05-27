'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventSchema = schema({
    eventId: Number,
    eventType: String,
    eventText: String,
    eventStartDate: Number,
    eventPrevAlarms: String,
    eventRepInterval: Number,
    eventRepType: String,
    eventRepStopDate: Number,
});

module.exports = mongoose.model('event', eventSchema)