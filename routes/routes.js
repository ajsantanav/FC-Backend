const express = require('express');
const app = express();
const router = express.Router();
const Users = require("../models/userSchema");
///C.R.U.D.

//get all users?
router.get('/', async (req, res) => { 
    try {
        const allUsers = await Users.find({}) //mongodb query
        res.json(allUsers)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


/// Create
router.post('/', async (req, res) => { 
    console.log("Request Body:", req.body);
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields (name, email, password) are required." });
        }
        const createUser = await Users.create({ name, email, password });
        console.log(req.body);
        res.status(201).json(createUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/// Read
router.get('/:id', async (req, res) => {
    try {
        const singleUser = await Users.findById(req.params.id)
        res.json(singleUser)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
/// Update

router.put('/:id', async (req, res) => {
    try {
        const updateUser = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        res.json(updateUser);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
///Delete

router.delete('/:id', async (req, res) => {

    try {
        const deleteUser = await Users.findByIdAndDelete(req.params.id)
        res.json(deleteUser);
    }
    catch (err) { 
        res.status(500).json({ message: err.message })
    }

})


module.exports = router;