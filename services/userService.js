const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (email, password, name, phoneNumber) => {
  console.log("service 1");
  const userCheck = await userDao.userLogin(email);

  if (!userCheck) {
    console.log("service 2");
    const salt = bcrypt.genSaltSync(10);
    const hashedPw = bcrypt.hashSync(password, salt);
    const user = await userDao.createUser(email, hashedPw, name, phoneNumber);
    console.log("service 3");
    return user;
  } else {
    const user = true;
    console.log("service 4");
    return user;
  }
};

const userLogin = async (email, password) => {
  const user = await userDao.userLogin(email);

  // 입력한 email,password 가 저장된 데이터와 동일한 경우
  if (user) {
    // 등록된 email일 경우 유저 데이터 및 유저 비밀번호 디비에서 꺼내옴
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    //token 생성
    const token = jwt.sign({ userId: user.id }, "secretKey");
    const userLoginData = {
      user: user,
      isPasswordCorrect: isPasswordCorrect,
      token: token,
    };
    return userLoginData;
  }
};

module.exports = { createUser, userLogin };
