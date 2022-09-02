function signupController(req, res) {
  res.status(500).json({ message: "not implemented" }); // 구현이 되면 삭제합니다.
}

function loginController(req, res) {
  res.status(500).json({ message: "not implemented" }); // 구현이 되면 삭제합니다.
}

module.exports = { signupController, loginController };
const userService = require("../services/userService");

/** 회원가입  */
const createUser = async (req, res) => {
  const { email, password, name, phoneNumber, birth, gender } = req.body;
  try {
    // 입력데이터가 다 들어왔는지 확인
    if (!(email && password && name && phoneNumber && birth && gender)) {
      res.status(400).json({ message: "ERROR: KEY" });
      return;
    }
    // 이메일형식이 맞는지 확인
    const expEmailText =
      /^[A-Za-z0-9\.\-]+\@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/;
    if (!expEmailText.test(email)) {
      res.status(400).json({ message: "ERROR: EMAIL_INVALID" });
      return;
    }
    // 비밀번호가 10자리가 넘어가는지 확인
    if (password.length < 10) {
      res.status(400).json({ message: "ERROR: PASSWORD_INVALID" });
      return;
    }
    // 전화번호형식이 맞는지 확인
    const expHpText = /^\d{10,11}$/;
    if (!expHpText.test(phoneNumber)) {
      res.status(400).json({ message: "ERROR: PHONENUMBER_INVALID" });
      return;
    }

    const result = await userService.createUser(
      email,
      password,
      name,
      phoneNumber,
      birth,
      gender
    );

    // 이미 가입된 회원일 경우
    if (result === true) {
      res.status(400).json({ message: "ERROR: EMAIL_ALREADY_USE" });
      return;
    }

    res.status(201).json({ message: "SINGUP_SUCCESS!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR: USERCREATED" });
  }
};

/** 로그인 */
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 입력데이터가 다 들어왔는지 확인
    if (!(email && password)) {
      res.status(400).json({ message: "ERROR: KEY" });
      return;
    }
    // 이메일형식이 맞는지 확인
    const expEmailText =
      /^[A-Za-z0-9\.\-]+\@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/;
    if (!expEmailText.test(email)) {
      res.status(400).json({ message: "ERROR: EMAIL_INVALID" });
      return;
    }

    const user = await userService.userLogin(email, password);

    // 등록된 email인지 확인
    if (!user) {
      res.status(404).json({ message: "ERROR: EMAIL_INCORRECT" });
      return;
    }
    //password가 틀릴 경우
    if (user.isPasswordCorrect === false) {
      res.status(400).json({ message: "ERROR: PASSWORD_INCORRECT" });
      return;
    }

    res.status(200).json({ message: "LOGIN_SUCCESS!", token: user.token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR: LOGIN" });
  }
};

module.exports = { createUser, userLogin };
