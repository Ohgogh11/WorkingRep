const express = require('express');
const loginRouter = express.Router();
const { getUserByEmail, comparePasswords } = require('../databaseWork')


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
  


      res.json(user); // TODO need to change after with JWT for now just sends the user itself as a json object
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });


// loginRouter.get('/api/users', (req, res) => {
//     res.json(users);
// });

// loginRouter.delete('/api/users', (req, res) => {
//     let id = parseInt(req.query.id);
//     let index = users.findIndex(user => user.id === parseInt(id));
//     if (index !== -1) {
//         users.splice(index, 1);
//         res.status(200).json(users);
//     } else {
//         res.status(404).json({ error: `User with ID ${id} not found.` });
//     }
// });

// loginRouter.post('/api/users', (req, res) => {
//     const { id, username, email, name, age } = req.query;
//     const existingUser = users.find(user => user.id === id || user.username === username);
//     if (existingUser) {
//         return res.status(400).json({ error: 'User already exists' });
//     }

//     users.push({ id, username, email, name, age });
//     res.status(201).json({ message: 'User added successfully', users });
// });

module.exports = loginRouter;
