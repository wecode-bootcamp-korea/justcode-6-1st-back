const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");

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
    const consent = false;
    const user = await userDao.createUser(
      email,
      hashedPw,
      name,
      phoneNumber,
      birth,
      gender,
      consent
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

const userData = async (userId) => {
  const getUserDataById = await userDao.userData(userId);
  for (const obj of getUserDataById) {
    obj.address = JSON.parse(obj.address);
    obj.point = JSON.parse(obj.point);
    obj.orderList = JSON.parse(obj.orderList);
    obj.reviews = JSON.parse(obj.reviews);
  }

  return getUserDataById;
};

module.exports = { createUser, userLogin, userData };
