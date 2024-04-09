const express = require('express');
const signupRouter = express.Router();
const {getUserByEmail,insertUser, doesUserExist,getUserById} = require('../databaseWork');


// signupRouter.get('/' ,async (req,res) =>{
//     console.log('entered get ')
//     res.json(await getUserByEmail('itay.fridburg@gmail.com'));
//     console.log('finished');
// });


signupRouter.post('/' , async (req,res) => {
    const { email, first_name, last_name, phone_number, password, permission } = req.body;

    try {
      // Check if user with email or phone number exists
      const userExists = await doesUserExist(email, phone_number);
  
      if (userExists) {
        if (email === userExists) {
          res.status(409).json({ message: 'User with this email already exists' });
        } else {
          res.status(409).json({ message: 'User with this phone number already exists' });
        }
        return; // Exit the function if user exists
      }
  
      // Hash password before insertion
      const userId = await insertUser(email, first_name, last_name, phone_number, password, permission);
      const user = await getUserById(userId);

      res.json(user); // sends the user so it will log in and have the user in local storage 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
});



module.exports = signupRouter;