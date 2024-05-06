const express = require("express");
const barberTokenRouter = express.Router();
const {
  createJwtToken,
  verifyAccessesToken,
  verifyBarberToken,
} = require("../JwtTokenWork");

/**
 * Handles GET requests to "/BarberLink" endpoint to generate a token for admin access.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns JSON response with a link containing the generated token.
 */
barberTokenRouter.get("/BarberLink", verifyAccessesToken, (req, res) => {
  if (req.payload.role !== "admin") {
    return res.status(403).json({ message: "role must be admin" });
  }
  const baseUrl = "http://192.168.1.170:5173/New-Barber";
  const token = createJwtToken({}, process.env.ADMIN_JWT_SECRET, "30min");
  return res.status(200).json({ link: `${baseUrl}?token=${token}` });
});

barberTokenRouter.post("/verifyToken", verifyBarberToken, (req, res) => {
  res.status(202).json({ message: "connection approved" });
});

module.exports = barberTokenRouter;
