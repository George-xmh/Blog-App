const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://MERN-Blog:6oTWFMpN4Dup4IIx@cluster0.ln42p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Multer Setup
const upload = multer({ dest: "uploads/" });
app.use("/uploads", express.static("uploads"));

// User Schema and Model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

// Post Schema and Model
const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model('Post', PostSchema);

// Create a New Post
app.post('/posts', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !content || !image) {
        return res.status(400).json({ error: 'Title, Content, and Image are required.' });
    }

    try {
        const newPost = new Post({ title, content, image });
        await newPost.save();
        res.status(201).json({ message: 'Post created successfully!', post: newPost });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post', details: err });
    }
});

// Fetch All Posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts', details: err });
    }
});

// Edit a Post
app.put('/posts/:id', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        post.title = title || post.title;
        post.content = content || post.content;

        if (image) {
            post.image = image;
        }

        await post.save();

        res.status(200).json({ message: 'Post updated successfully!', post });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update post', details: err });
    }
});

// Delete a Post
app.delete('/posts/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete post', details: err });
    }
});

// Register a New User
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
        if (err.code === 11000) { 
            res.status(400).json({ error: 'Username already exists.' });
        } else {
            res.status(500).json({ error: 'Failed to register user', details: err });
        }
    }
});

// Login User
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

        res.json({ message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log in', details: err });
    }
});

// Start the Server
app.listen(4000, () => {
    console.log('Backend running on http://localhost:4000');
});