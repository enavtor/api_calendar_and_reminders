//Strict mode ensures that sintax errors won't be allowed:
'use strict'

//Mongoose module and schema class are required in order to define the mongoDB user model:
const mongoose = require('mongoose');
const schema = mongoose.Schema;

//First the user's model structure is defined as a JSON:
const userSchema = schema({
    name: String,
    nickname: String,
    password: String
});

//Now the model is exported so the corresponding controller can define the appropriate CRUD operations:
module.exports = mongoose.model('user', userSchema);