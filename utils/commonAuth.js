const authDao = require("../models/authDao");
const jwt = require("jsonwebtoken");

const commonAuth = async (req, res) => {
  try {
    if (req.headers["authorization"] != "") {
      const headers = req.headers["authorization"];
      const accessToken = headers.split(" ")[1];
      const decode = jwt.verify(accessToken, process.env.JWT_SECRET);
      const userId = decode.sub;
      const user = await authDao.getUserById(userId);

      if (!user) {
        res.status(404).json({ result: false });
      } else {
        res.status(200).json({ result: true });
      }
    } else {
      res.status(404).json({ result: false });
    }
  } catch (err) {
    return res.status(404).json({ result: false });
  }
};

module.exports = { commonAuth };
