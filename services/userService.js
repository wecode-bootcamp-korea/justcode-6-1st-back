const userDao = require("../models/userDao");
const bcrypt = require("bcryptjs");
// const jwt = require('jsonwebtoken');

const createUser = async (email, password, name, phoneNumber) => {
  // console.log("service 1");
  const salt = bcrypt.genSaltSync(10);
  const hashedPw = bcrypt.hashSync(password, salt);

  const user = await userDao.createUser(email, hashedPw, name, phoneNumber);
  // console.log("service 2");
  return user;
};

// function login() {}

module.exports = { createUser };
