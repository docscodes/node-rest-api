const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

try {
  mongoose.connect(process.env.MONGO_URL);
} catch (error) {
  handleError(error);
}

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to home page.");
});

app.get("/users", (req, res) => {
  res.send("Welcome to users page.");
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});
