const mongoose = require('mongoose')


const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true },
    class: { type: String, required: true },
    race: { type: String, required: true },
    stats: {
        strength: { type: Number, default: 10 },
        dexterity: { type: Number, default: 10 },
        constitution: { type: Number, default: 10 },
        intelligence: { type: Number, default: 10 },
        wisdom: { type: Number, default: 10 },
        charisma: { type: Number, default: 10 }
    }
});


//defined move Schema, what it should have and not
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    characters: [characterSchema] 
})

//create the move model
const User = mongoose.model('User', userSchema);


//exports this file
module.exports = User