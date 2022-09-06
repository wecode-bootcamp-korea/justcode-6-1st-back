const express = require("express");
const cartsController = require("../controllers/carts");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("", auth.validationToken, cartsController.createCarts);
router.get("", auth.validationToken, cartsController.getCarts);
router.patch("", auth.validationToken, cartsController.updateCarts);
router.delete("", auth.validationToken, cartsController.deleteCarts);

module.exports = router;
