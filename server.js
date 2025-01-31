const express = require('express');
const app = express();
const connect = require('./config/db'); //add connectedDB - check mark
const userRoutes = require('./routes/routes');
const firstUser = require('./config/seed');
const User = require('./models/userSchema')
connect();

const PORT = process.env.PORT || 8080; 

// ##############################################
app.use(express.json()) // this always goes before routes
app.use('/api/users', userRoutes) //add routes

// ##############################################
app.get('/', (req, res) => {
    res.status(200)
    res.send("Welcome to the homepage")
})

// ##############################################

app.get('/users/seed', async (req, res) => {
    try {
        await User.deleteMany({});
        await User.create(firstUser)
        res.json(firstUser)
    }
    catch (error)
    {
        console.log(`Something went wrong loading the seed data: ${error.message}`);
    }
})

// ##############################################


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} - Adrian`)
})