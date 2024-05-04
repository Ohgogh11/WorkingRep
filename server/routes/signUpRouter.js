const express = require("express");
const signupRouter = express.Router();
const { insertUser, doesUserExist, getUserById } = require("../databaseWork");

signupRouter.post("/", async (req, res) => {
  const { email, first_name, last_name, phone_number, password, permission } =
    req.body;

  try {
    // Check if user with email or phone number exists
    const userExists = await doesUserExist(email, phone_number);

    if (userExists) {
      return res
        .json({
          message: "User with this email or phone number already exists",
        })
        .status(409);
    }

    // Hash password before insertion
    const userId = await insertUser(
      email,
      first_name,
      last_name,
      phone_number,
      password,
      permission
    );
    const user = await getUserById(userId);

    res.json(user); // sends the user so it will log in and have the user in local storage
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

module.exports = signupRouter;
