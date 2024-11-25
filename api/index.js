const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow frontend to make requests
  }));
  app.use(express.json());  // Middleware to parse JSON bodies

app.post('/register', (req, res) => {
    console.log(req.body);  // Check the request body
    res.json({ message: "Registration successful" });  // Send response
});

app.listen(4000, '0.0.0.0', () => {
    console.log('Backend running on http://localhost:4000');
  });
  