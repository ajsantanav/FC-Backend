const mongoose = require('mongoose')

//defined move Schema, what it should have and not
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

//create the move model
const User = mongoose.model('User', userSchema);


//exports this file
module.exports = User