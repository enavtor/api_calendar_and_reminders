'use strict'

const mongoose = require('mongoose');
const app = require('./app');

const databasePort = 27017;
const serverPort = 3000;
const url = 'mongodb://localhost:' + databasePort + '/usersDB';

mongoose.connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log('Database initialized!');
    app.listen(serverPort, () => {
        console.log('Server listening on port ' + serverPort);
    });
  })
  .catch(err =>  {
    console.log(err);
  });