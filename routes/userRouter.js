const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.userLogin);
router.get("/my", auth.validationToken, userController.userData);
router.patch("/my", auth.validationToken, userController.updateUser);
router.patch("/mypw", auth.validationToken, userController.updatePassword);

module.exports = router;
