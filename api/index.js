const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', (req, res) => {
  const {username, password} = req.body;
  res.json({ requestData: { username, password } });
});

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
//mongodb+srv://MERN-Blog:6oTWFMpN4Dup4IIx@cluster0.ln42p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
