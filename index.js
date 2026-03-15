const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Media REST API",
      version: "1.0.0",
      description: "API documentation for the social media REST API",
    },
    servers: [{ url: "http://localhost:8800" }],
  },
  apis: ["./routes/*.js"],
});

try {
  mongoose.connect(process.env.MONGO_URL);
} catch (error) {
  handleError(error);
}

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Backend server is running!");
});

module.exports = app;
