const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors());
  app.use(router);
  app.use(morgan("tiny"));

  return app;
};

module.exports = { createApp };
