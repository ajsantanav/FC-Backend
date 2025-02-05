import express from 'express';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import Users from '../models/userSchema.js';
///C.R.U.D.

const router = express.Router();
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

router.post(
    '/',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
    async (req, res) => {
      //Check if any validation errors
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      //Destructure our req
      const { name, email, password } = req.body;
  
      try {
        //Check is user already exists
        let user = await User.findOne({ email });
        //If they exist respond with error
        if (user) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'User Already Exist' }] });
        }
  
        //Create a user
        user = new User({
          name,
          email,
          password,
        });
  
        //Encrypt password
        const salt = await bcrypt.genSalt(10);
  
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        //Creating payload (data for the front end) for jwt
        const payload = {
          user: {
            id: user.id,
          },
        };
  
        //Creating a jwt, signing, and if there are no errors, sending token to the front end
        jwt.sign(
          payload,
          process.env.jwtSecret,
          { expiresIn: 3600 }, 
          (err, token) => {
            if (err) throw err;
  
            res.json({ token });
          }
        );
      } catch (err) {
        console.error(err);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
      }
    }
  );


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

//// ############################## CHARACTER CRUD

router.post('/:id/characters', async (req, res) => {
    try {
        const { name, level, class: charClass, race, stats } = req.body;

        if (!name || !level || !charClass || !race || !stats) {
            return res.status(400).json({ message: "All character fields are required." });
        }

        const user = await Users.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const newCharacter = {
            name,
            level,
            class: charClass,
            race,
            stats
        };


        user.characters.push(newCharacter);
        await user.save(); 

        return res.status(201).json(user.characters); 
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id/characters', async (req, res) => {
    try {
        const user = await Users.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(user.characters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:userId/characters/:characterId', async (req, res) => {
    try {
        const user = await Users.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Filter out the character to delete
        user.characters = user.characters.filter(
            (character) => character.id.toString() !== req.params.characterId
        );

        await user.save();
        res.json({ message: "Character deleted successfully.", characters: user.characters });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;