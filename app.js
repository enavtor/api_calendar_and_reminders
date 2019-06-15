//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//Node Express and Body-Parser modules are loaded:
const express = require('express');
const bodyparser = require('body-parser');

//The user and event routes are used to define the CRUD operations location:
const userRoutes = require('./routes/userRoute');
const eventRoutes = require('./routes/eventRoute');

//The express application is created (application that contains the server fucntionalities) and initialized:
const app = express();

app.use(bodyparser.urlencoded({ extended : true }));
app.use(bodyparser.json());

//The users' and events' CRUD operations paths are defined:
app.use('/user', userRoutes);
app.use('/event', eventRoutes);

//Now the expess app is exported so it can be used by index.js:
module.exports = app;