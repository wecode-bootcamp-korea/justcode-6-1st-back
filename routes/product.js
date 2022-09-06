const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

router.get("/products", productController.getProducts);
router.get("/product/:id", productController.getProductsById);

module.exports = router;
