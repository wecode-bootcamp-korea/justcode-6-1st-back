const express = require("express");
const { getProducts } = require("../controllers/product");

const router = express.Router();

router.get("/products", getProducts);

module.exports = router;
