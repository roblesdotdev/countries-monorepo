const express = require("express");
const http = require("http");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error-middleware");
const { errorBuilder, successBuilder } = require("./middlewares/responses");
require("express-async-errors"); // for async handlers

// routes
const getApiRoutes = require("./routes");

const app = express();

app.name = "API";

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");
  app.use(morgan("tiny"));
}
app.use(
  cors({
    origin: "*", // TODO: move to env
    credentials: true,
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  })
);

// Custom error and success responses
app.use(errorBuilder);
app.use(successBuilder);

// Server routes
app.use(getApiRoutes());

// generic error handler
app.use(errorMiddleware);

const server = http.createServer(app);

module.exports = server;
