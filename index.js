//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//The node mongoose module is imported so mongoDB can be used:
const mongoose = require('mongoose');

//The express app module is exported from the app.js file:
const app = require('./app');

//Constants defining the database port and url, and the server port are declared:
const databasePort = 27017;
const serverPort = 3000;
const url = 'mongodb://localhost:' + databasePort + '/usersDB';

//Now the database connection is established, starting also the server if the mongoDB was succcesfully created:
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