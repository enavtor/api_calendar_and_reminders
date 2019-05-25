'use strict'

const express = require('express');
const userController = require('../controllers/userController');

const userRoute = express.Router();

userRoute.post('/', userController.postUser);
userRoute.get('/', userController.getUser);
userRoute.delete('/:nickname', userController.deleteUser);

module.exports = userRoute;