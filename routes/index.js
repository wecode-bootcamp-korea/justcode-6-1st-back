const express = require("express");

const router = express.Router();

const userRouter = require("./userRouter");
const productRouter = require("./product");

router.get("/", (req, res) => {
  res.json({ message: "/ pong" });
});

router.use("/users", userRouter);
router.use(productRouter);
// router.use("/carts", cartsRouter);

module.exports = router;
