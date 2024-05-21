const jwt = require("jsonwebtoken");
/**
 * Creates a JWT token with the given payload, secret key, expiration, and options.
 * @param {object} payload - The payload to be included in the JWT token.
 * @param {string} secretKey - The secret key used to sign the JWT token.
 * @param {string | number} expiration - The expiration time for the JWT token.
 * @param {object} [options={}] - Additional options for configuring the JWT token.
 * @returns {string} The generated JWT token.
 * @throws {Error} If there is an error creating the JWT token.
 */
function createJwtToken(payload, secretKey, expiration, options = {}) {
  // Default options

  const defaultOptions = {};

  if (expiration) {
    defaultOptions.expiresIn = expiration;
  }
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
/**
 * Verifies the access token in the request headers and proceeds to the next middleware if valid.
 * @param {Request} req - The request object containing headers.
 * @param {Response} res - The response object to send status codes.
 * @param {NextFunction} next - The next function in the middleware chain.
 * @returns None
 */
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
/**
 * Verifies the token in the request headers and sets the payload in the request object.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns None
 */
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
/**
 * Verifies the confirmation token in the request headers using the JWT secret.
 * If the token is missing or invalid, it sends the appropriate status code in the response.
 * If the token is valid, it attaches the decoded payload to the request object and calls the next middleware.
 * @param {Request} req - The request object containing the confirmation token in the headers.
 * @param {Response} res - The response object to send status codes.
 * @param {NextFunction} next - The next middleware function to call.
 * @returns None
 */
function verifyConfirmationToken(req, res, next) {
  const token = req.headers["authorization"];
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
/**
 * Verifies the authenticity of a token using the provided secret key.
 * @param {string} token - The token to verify.
 * @param {string} secretKey - The secret key used to verify the token.
 * @returns {object | null} The decoded token if verification is successful, null otherwise.
 */
function verifyToken(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
}
module.exports = {
  createJwtToken,
  verifyAccessesToken,
  verifyBarberToken,
  verifyConfirmationToken,
};
