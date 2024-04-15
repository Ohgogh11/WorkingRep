const express = require('express');
const loginRouter = express.Router();
const { getUserByEmail, comparePasswords } = require('../databaseWork')
const jwt = require('jsonwebtoken');

//login request handler 


loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  // Validation (add more validation if needed)
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).send('Invalid credentials'); // Unauthorized
    }

    const passwordMatch = await comparePasswords(user, password);
    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials');
    }

    // TODO Login successful (replace with JWT generation or session logic)
    // TODO ... (e.g., generate JWT using a secret key)
    const jwtToken = jwt.sign(
      { id: user.user_id, email: user.email, phoneNumber: user.phone_number, permission: user.permission },
      process.env.JWT_SECRET, { expiresIn: '2h' }
    );


    res.json({ token: jwtToken }); // TODO need to change after with JWT for now just sends the user itself as a json object
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = loginRouter;
