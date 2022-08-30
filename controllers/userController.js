const userService = require("../services/userService");

/** 로그인  */
const createUser = async (req, res) => {
  // console.log("controller 1");
  const { email, password, name, phoneNumber } = req.body;

  if (!(email && password && name && phoneNumber)) {
    res.status(400).json({ message: "key error" });
    return;
  }

  try {
    const result = await userService.createUser(
      email,
      password,
      name,
      phoneNumber
    );
    // console.log("controller 2");
    res.status(201).json({ message: "userCreated" });
  } catch {
    res.status(500).json({ message: "Error : userCreated" });
  }
};

// function loginController(req, res) {
//   res.status(500).json({ message: 'not implemented' }); // 구현이 되면 삭제합니다.
// }

module.exports = { createUser };
