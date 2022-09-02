const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (
  email,
  password,
  name,
  phoneNumber,
  birth,
  gender
) => {
  const userCheck = await userDao.userLogin(email);

  if (!userCheck) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPw = bcrypt.hashSync(password, salt);
    const user = await userDao.createUser(
      email,
      hashedPw,
      name,
      phoneNumber,
      birth,
      gender
    );
    return user;
  } else {
    const user = true;
    return user;
  }
};

const userLogin = async (email, password) => {
  const user = await userDao.userLogin(email);

  if (user) {
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    //token 생성
    const token = jwt.sign({ userId: user.id }, "codingResKey");
    const userLoginData = {
      user: user,
      isPasswordCorrect: isPasswordCorrect,
      token: token,
    };

    return userLoginData;
  }
};

module.exports = { createUser, userLogin };
