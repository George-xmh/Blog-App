const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://MERN-Blog:6oTWFMpN4Dup4IIx@cluster0.ln42p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// User model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        if (err.code === 11000) { // Duplicate username error
            res.status(400).json({ error: 'Username already exists.' });
        } else {
            res.status(500).json({ error: 'Failed to register user', details: err });
        }
    }
});
//Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid username or password.' });
        }

        // Login successful
        res.json({ message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log in', details: err });
    }
});

app.listen(4000, () => {
    console.log('Backend running on http://localhost:4000');
});
