const express = require("express");
const router = express.Router();

const cors = require("cors");
router.use(cors("http://localhost:3000"));

const userRouter = require("./userRouter");

router.get("/", (req, res) => {
  res.json({ message: "/ pong" });
});

router.use("/users", userRouter);

module.exports = router;
