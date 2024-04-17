const express = require("express");
const loginRouter = express.Router();
const { getUserByEmail, comparePasswords } = require("../databaseWork");
const jwt = require("jsonwebtoken");

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
    const jwtToken = jwt.sign(
      {
        iss: "oauth",
        sub: user.user_id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
        iat: Math.floor(Date.now() / 1000), // Issued at current time
        // more user details
        email: user.email,
        phone_number: user.phone_number,
        role: user.permission,
      },
      process.env.JWT_SECRET
    );

    // TODO: need to implement refresh token
    res.json({ token: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = loginRouter;
