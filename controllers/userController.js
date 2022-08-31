const userService = require("../services/userService");

/** 회원가입  */
const createUser = async (req, res) => {
  console.log("controller 1");
  const { email, password, name, phoneNumber } = req.body;
  try {
    // 입력데이터가 다 들어왔는지 확인
    if (!(email && password && name && phoneNumber)) {
      res.status(400).json({ message: "KEY_ERROR" });
      return;
    }
    // 이메일형식이 맞는지 확인
    const expEmailText =
      /^[A-Za-z0-9\.\-]+\@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/;
    if (!expEmailText.test(email)) {
      res.status(400).json({ message: "ERROR: EMAIL INVALID" });
      return;
    }
    // 비밀번호가 10자리가 넘어가는지 확인
    if (password.length < 10) {
      res.status(400).json({ message: "ERROR: PASSWORD INVALID" });
      return;
    }
    // 전화번호형식이 맞는지 확인
    const expHpText = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!expHpText.test(phoneNumber)) {
      res.status(400).json({ message: "ERROR: PHONENUMBER INVALID" });
      return;
    }

    const result = await userService.createUser(
      email,
      password,
      name,
      phoneNumber
    );

    if (result === true) {
      res.status(400).json({ message: "YOU ARE EMAIL ALREADY USE" });
      return;
    }

    console.log("controller 2");
    res.status(201).json({ message: "userCreated" });
  } catch {
    res.status(500).json({ message: "Error : userCreated" });
  }
};

/** 로그인 */
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!(email && password)) {
      res.status(400).json({ message: "key error" });
      return;
    }

    const expEmailText =
      /^[A-Za-z0-9\.\-]+\@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/;
    if (!expEmailText.test(email)) {
      res.status(400).json({ message: "ERROR: EMAIL INVALID" });
      return;
    }

    const user = await userService.userLogin(email, password);

    // 등록된 email인지 확인
    if (!user) {
      res.status(404).json({ message: "Please check your email" });
      return;
    }
    //password가 틀릴 경우
    if (user.isPasswordCorrect === false) {
      res.status(400).json({ message: "Please check your password" });
      return;
    }
    res.status(200).json({ message: "login Success!", token: user.token });
  } catch {
    res.status(500).json({ message: "Error: login " });
  }
};

module.exports = { createUser, userLogin };
