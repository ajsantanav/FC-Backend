const express = require('express')
const dotenv = require('dotenv')

//add connectedDB
//add routes

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Welcome")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} - Adrian`)
})