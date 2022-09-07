const express = require("express");

const router = express.Router();

const userRouter = require("./userRouter");
const productRouter = require("./productRouter");
const cartsRouter = require("./cartsRouter");

router.get("/", (req, res) => {
  res.json({ message: "/ pong" });
});

router.use(userRouter);
router.use(productRouter);
router.use("/carts", cartsRouter);

module.exports = router;
