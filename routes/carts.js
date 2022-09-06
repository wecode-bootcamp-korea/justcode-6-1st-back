const express = require("express");
const cartsController = require("../controllers/carts");

const router = express.Router();

router.post("", cartsController.createCarts);
router.get("/:userId", cartsController.getCarts);
router.patch("/", cartsController.updateCarts);
router.delete("/", cartsController.deleteCarts);

module.exports = router;
