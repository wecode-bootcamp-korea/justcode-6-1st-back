const express = require("express");
const router = express.Router();
const cors = require("cors");

const userRouter = require("./userRouter");
const productRouter = require("./product");

router.get("/", (req, res) => {
  res.json({ message: "/ pong" });
});

router.use("/users", userRouter);
// router.use("/products", productRouter);
router.use(cors("http://localhost:3000"));

module.exports = router;
