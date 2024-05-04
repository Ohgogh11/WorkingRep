const express = require("express");
const loginRouter = express.Router();
const { getUserByEmail, comparePasswords } = require("../databaseWork");
const { createJwtToken } = require("../JwtTokenWork");
//login request handler

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  // Validation (add more validation if needed)
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).send("Invalid credentials"); // Unauthorized
    }

    const passwordMatch = await comparePasswords(user, password);
    if (!passwordMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // TODO Login successful (replace with JWT generation or session logic)
    // TODO ... (e.g., generate JWT using a secret key)

    const jwtToken = createJwtToken(
      {
        userID: user.user_id,
        email: user.email,
        phone_number: user.phone_number,
        role: user.permission,
        firstName: user.first_name,
      },
      process.env.JWT_SECRET,
      "1h"
    );

    // TODO: need to implement refresh token
    res.json({ token: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = loginRouter;
