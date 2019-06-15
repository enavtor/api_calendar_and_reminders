//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//Express router and the user controller are imported to define the CRUD operations routes:
const express = require('express');
const userController = require('../controllers/userController');

const userRoute = express.Router();

//Each operation route is specified along with the controller's function that defines its functionality:
userRoute.get('/all', userController.getAllUsers);
userRoute.get('/:nickname/:password', userController.getUser);
userRoute.post('/', userController.postUser);
userRoute.put('/', userController.putUser);
userRoute.delete('/', userController.deleteUser);

//Now the user route is exported so the app module can use it:
module.exports = userRoute;