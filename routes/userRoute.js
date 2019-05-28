'use strict'

const express = require('express');
const userController = require('../controllers/userController');

const userRoute = express.Router();

userRoute.get('/', userController.getUser);
userRoute.post('/', userController.postUser);
userRoute.delete('/:nickname', userController.deleteUser);

module.exports = userRoute;