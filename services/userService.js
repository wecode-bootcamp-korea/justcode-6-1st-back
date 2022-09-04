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

  const address = [];
  const data = {
    userId: getUserDataById[0].userId,
    email: getUserDataById[0].email,
    name: getUserDataById[0].name,
    phoneNumber: getUserDataById[0].phoneNumber,
    birth: getUserDataById[0].birth,
    gender: getUserDataById[0].gender,
    isConsent: getUserDataById[0].isConsent,
    address: address,
  };
  for (const addresslist of getUserDataById) {
    address.push({
      addressId: addresslist.addressId,
      postalCode: addresslist.postalCode,
      address3: addresslist.address,
      address1: addresslist.address1,
    });
  }
  console.log(data);
  return data;
};

module.exports = { createUser, userLogin, userData };
