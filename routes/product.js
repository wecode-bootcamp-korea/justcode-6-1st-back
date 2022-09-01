const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

router.get("/list", productController.getProducts);
router.get("/product/:id", productController.getProductsById);
router.get("/products", productController.getProductsByCategory);
router.get("/search", productController.getProductsBySearch);

module.exports = router;
