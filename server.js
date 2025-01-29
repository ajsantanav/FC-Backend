const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config();
const PORT = process.env.PORT || 8080
//add connectedDB
//add routes

// ##############################################
app.use(express.json())


// ##############################################
app.get('/', (req, res) => {
    res.status(200)
    res.send("Welcome to the homepage")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} - Adrian`)
})