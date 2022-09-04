const authDao = require("../models/authDao");
const jwt = require("jsonwebtoken");

const validationToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"];
    const accessToken = headers.split(" ")[1];
    const decode = await jwt.verify(accessToken, "codingResKey");
    const userId = decode.userId;
    const user = await authDao.getUserById(userId);
    if (!user) {
      res.status(404).json({ message: "USER_NOT_FOUND" });
    } else {
      req.userId = userId;
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validationToken };
