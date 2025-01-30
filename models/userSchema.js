const mongoose = require('mongoose')

//defined move Schema, what it should have and not
const userRegistration = mongoose.Schema({
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
const Pokemon = mongoose.model('Pokemon', pokemonSchema);


//exports this file
module.exports = Pokemon