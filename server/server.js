require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signUpRouter");
const productRouter = require("./routes/productRouter");
const wishlistRouter = require("./routes/wishlistRouter");
const userBanListRouter = require("./routes/userBanListRouter");
const barberTokenRouter = require("./routes/barberTokenRouter");
const AppointmentRouter = require("./routes/AppointmentRouter");
const pool = require("./db");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

/**
 * Sets up the routes for various API endpoints using Express middleware.
 * @param {string} "/api/images" - The route for serving static images.
 * @param {Router} loginRouter - The router for handling login related API endpoints.
 * @param {Router} signupRouter - The router for handling signup related API endpoints.
 * @param {Router} AppointmentRouter - The router for handling appointment related API endpoints.
 * @param {Router} productRouter - The router for handling product related API endpoints.
 * @param {Router} wishlistRouter - The router for handling wishlist related API endpoints.
 * @param {Router} userBanListRouter - The router for handling user ban list related API endpoints.
 * @param {Router}
 */

app.use("/api/images", express.static(path.join(__dirname, "images")));
app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/Appointments", AppointmentRouter);
app.use("/api/products", productRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/userBanListRouter", userBanListRouter);
app.use("/api/admin/BarberToken", barberTokenRouter);

/**
 * Starts the server and listens on the specified port.
 * @param {number} PORT - The port number on which the server will listen.
 * @returns None
 */
const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Gracefully shutdown server and close MySQL connection pool
const shutdown = async () => {
  console.log("Shutting down server...");
  server.close(() => {
    console.log("HTTP server closed.");
  });

  try {
    await pool.end();
    console.log("MySQL connection pool closed.");
    process.exit(0);
  } catch (err) {
    console.error("Error closing MySQL connection pool:", err);
    process.exit(1);
  }
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
