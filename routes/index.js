const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const productRouter = require("./product");

router.get("/", (req, res) => {
  res.json({ message: "/ pong" });
});

router.use(userRouter);
router.use(productRouter);

module.exports = router;
