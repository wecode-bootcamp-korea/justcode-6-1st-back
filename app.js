const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(router);
  app.use(morgan("dev"));

  return app;
};

module.exports = { createApp };
