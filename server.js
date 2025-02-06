import express from 'express';
const app = express();
import connect from './config/db.js';
connect();
import cors from 'cors';
import userRoutes from './routes/routes.js';
import firstUser from './config/seed.js';
import User from './models/userSchema.js'
import authRoutes from './routes/auth.js';





const PORT = process.env.PORT || 8080; 

// ##############################################
app.use(express.json()) // this always goes before routes
app.use(cors());
app.use('/api/users', userRoutes) //add routes
app.use('/api/auth', authRoutes);
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