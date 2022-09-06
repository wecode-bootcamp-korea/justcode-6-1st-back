const authDao = require("../models/authDao");
const jwt = require("jsonwebtoken");

const commonAuth = async (req, res) => {
  try {
    if (req.headers["authorization"] != "") {
      const headers = req.headers["authorization"];
      const accessToken = headers.split(" ")[1];
      const decode = await jwt.verify(accessToken, "codingResKey");
      const userId = decode.userId;
      const user = await authDao.getUserById(userId);

      if (!user) {
        console.log(user);
        res.status(404).json({ result: "false1" });
      } else {
        res.status(200).json({ result: true });
      }
    } else {
      res.status(404).json({ result: "false2" });
    }
  } catch (err) {
    return res.status(404).json({ result: "false3" });
  }
};

module.exports = { commonAuth };
