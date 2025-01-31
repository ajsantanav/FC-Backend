const express = require('express');
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
    try {
        const createUser = await Users.create(req.body)
        console.log(req.body)
        res.json(createUser)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})


/// Read
router.get('/:id', async (req, res) => {
    try {
        const singleUser = await Users.findById(req.params.id)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
/// Update

router.put('/:id', async (req, res) => {
    try {
        const updateUser = await Users.findByIdAndUpdate(req.params.id, req.body)
        res.json(updateUser)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
///Delete

router.delete('/:id', async () => {

    try {
        const deleteUser = await Users.findByIdAndDelete(req.params.id)
        res.json(deleteUser);
    }
    catch (err) { 
        res.status(500).json({ message: err.message })
    }

})


module.exports = router;