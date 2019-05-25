'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
    name: String,
    age: Number,
    nickname: String,
    password: String
});

module.exports = mongoose.model('user', userSchema);