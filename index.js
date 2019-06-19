//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//The node localtunnel module is imported in order to assign a public subdomain to localhost:3000:
const localtunnel = require('localtunnel');

//The node mongoose module is imported so mongoDB can be used:
const mongoose = require('mongoose');

//The express app module is exported from the app.js file:
const app = require('./app');

//Constants defining the database port and url, and the server port are declared:
const databasePort = 27017;
const serverPort = 3000;
const url = 'mongodb://localhost:' + databasePort + '/usersDB';

//Before the server is started, the public subdomain 'droidmare-api' is asigned to localhost:
localtunnel(serverPort, {subdomain: 'droidmare-api'}, (err, tunnel) => {
  //The server will be started only if the tunnel is successfully created:
  if (err) console.log('Could not create tunnel!');
  else {
    console.log('Tunnel successfully created. Public domain: ' + tunnel.url);
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
  }
});