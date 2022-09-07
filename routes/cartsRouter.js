const express = require("express");
const cartsController = require("../controllers/cartsController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("", auth.validationToken, cartsController.createCart);
router.get("", auth.validationToken, cartsController.getCarts);
router.patch("", auth.validationToken, cartsController.updateCart);
router.delete("", auth.validationToken, cartsController.deleteCarts);

module.exports = router;
