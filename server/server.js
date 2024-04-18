const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const loginRouter = require("./routes/loginRouter");
const signupRouter = require("./routes/signUpRouter");
const productRouter = require("./routes/productRouter");
const wishlistRouter = require("./routes/wishlistRouter");
const userBanListRouter = require("./routes/userBanListRouter");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

app.get("/api/AdminToken", (req, res) => {
  res.status(200).json({ token: generateRandomString(10) });
});

app.use("/api/images", express.static(path.join(__dirname, "images")));
app.use("/api/login", loginRouter);
app.use("/api/signup", signupRouter);
app.use("/api/products", productRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/userBanListRouter", userBanListRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
