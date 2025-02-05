const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken')
const {check , validationResult} = require('express-validator')
const Users = require("../models/userSchema");
const User = require('../models/userSchema');
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
// router.post('/', async (req, res) => { 
//     console.log("Request Body:", req.body);
//     try {
//         const { name, email, password } = req.body;
//         if (!name || !email || !password) {
//             return res.status(400).json({ message: "All fields (name, email, password) are required." });
//         }
//         const createUser = await Users.create({ name, email, password });
//         console.log(req.body);
//         res.status(201).json(createUser);
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

router.post('/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password','Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    async (req, res) => { 
    console.log("Request Body:", req.body);
    const errors = validationResult(req);

    if(!errors.isEmpty()) // 
    {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {

        let createUser = await User.findOne({email});

        if(createUser) {
            return res.status(400).json({errors: [{ msg: 'User Already exists'}]})
        }
        createUser = new User({
            name, email, password
        });
        // encrypt password using bcrypt lower number = less encrypter. rec. 10-12
        const salt = await bycript.genSalt(8);

        //payload to use on the the front end
        const payload = { 
            user: {
                id: createUser.id,
            },
        };

        //create token for the front and with jwet and signing
        jwt.sign(
            payload,
            process.env.jwtSecret, //secret token
            { expiresIn: 5000 }, // expiration
            (err, token) => {
                if (err) throw err;
                res.json({token});
            }
        )
        console.log(req.body);
        res.status(201).json(createUser);
    }
    catch (err) {
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
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