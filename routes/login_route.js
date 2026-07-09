const express = require('express');
const loginroute = express.Router();
const jwt  = require('jsonwebtoken');

// Fake login route to generate a token for testing
loginroute.post('/login', (req, res) => {
  try{
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, process.env.SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
   }
  catch(err) //this also err send res as 404 with err message
  {
      res.status(404).json({status : false, message : err.message});
  }
});

module.exports = loginroute;