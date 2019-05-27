'use strict'

const express = require('express');
const bodyparser = require('body-parser');

const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');

const app = express();

app.use(bodyparser.urlencoded({ extended : true }));
app.use(bodyparser.json());

app.use('/user', userRoutes);
app.use('evet', eventRoutes);

module.exports = app;