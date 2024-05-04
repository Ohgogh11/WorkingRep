const jwt = require("jsonwebtoken");

function createJwtToken(payload, secretKey, expiration, options = {}) {
  // Default options
  const defaultOptions = {
    expiresIn: expiration,
  };

  // Merge provided options with defaults
  const mergedOptions = Object.assign({}, defaultOptions, options);

  try {
    // Sign the token with the secret key and options, using payload directly as payload
    const token = jwt.sign(payload, secretKey, mergedOptions);
    return token;
  } catch (error) {
    console.error("Error creating JWT token:", error);
    throw new Error("Failed to generate JWT token"); // Or handle error differently
  }
}

function verifyAccessesToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  const response = verifyToken(token, process.env.JWT_SECRET);
  if (!response) {
    return res.sendStatus(403);
  }
  req.payload = response;
  next();
}

function verifyBarberToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.sendStatus(401);
  }
  const response = verifyToken(token, process.env.ADMIN_JWT_SECRET);
  if (!response) {
    return res.sendStatus(403);
  }
  req.payload = response;
  next();
}

function verifyToken(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
}

module.exports = { createJwtToken, verifyAccessesToken, verifyBarberToken };
