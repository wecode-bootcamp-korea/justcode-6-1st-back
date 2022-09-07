const express = require("express");
const reviewsController = require("../controllers/reviewsController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("", auth.validationToken, reviewsController.createReviews);
router.get("", auth.validationToken, reviewsController.getReviews);
router.patch("", auth.validationToken, reviewsController.updateReviews);
router.delete("", auth.validationToken, reviewsController.deleteReviews);

module.exports = router;
