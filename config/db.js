const mongoose = require('mongoose')

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
    }
    catch (err) {
        console.log(`Cannot connect to the DB ${err}`);
    }
}

module.exports = connect