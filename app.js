'use strict'

const express = require('express');
const bodyparser = require('body-parser');
const userRoutes = require('./routes/userRoute');

const app = express();

app.use(bodyparser.urlencoded({ extended : true }));
app.use(bodyparser.json());

app.use('/user', userRoutes);

module.exports = app;