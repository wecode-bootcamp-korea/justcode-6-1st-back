const express = require("express");

const userRouter = require("./user");
const productRouter = require("./product");
const cartsRouter = require("./carts");

const router = express.Router();

router.use(userRouter);
router.use(productRouter);
router.use("/carts", cartsRouter);

module.exports = router;
