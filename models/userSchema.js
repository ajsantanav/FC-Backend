const mongoose = require('mongoose')

//defined move Schema, what it should have and not
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
})

//create the move model
const Pokemon = mongoose.model('User', userSchema);


//exports this file
module.exports = Pokemon