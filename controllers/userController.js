const userService = require("../services/userService");
const {
  validateEmail,
  validatePassword,
  validateNumber,
} = require("../utils/validation");

const createUser = async (req, res) => {
  try {
    const { email, password, name, phoneNumber, birth, gender } = req.body;

    if (!(email && password && name && phoneNumber && birth && gender)) {
      return res.status(400).json({ message: "ERROR: KEY" });
    }

    validateEmail(email);
    validatePassword(password);
    validateNumber(phoneNumber);

    const result = await userService.createUser(
      email,
      password,
      name,
      phoneNumber,
      birth,
      gender
    );

    if (!result) {
      return res.status(400).json({ message: "ERROR: EMAIL_ALREADY_USE" });
    }

    res.status(201).json({ message: "userCreated" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({ message: "ERROR: KEY" });
      return;
    }

    validateEmail(email);
    validatePassword(password);

    const user = await userService.userLogin(email, password);

    if (!user) {
      res.status(404).json({ message: "ERROR: EMAIL_INCORRECT" });
      return;
    }
    if (!user.isPasswordCorrect) {
      res.status(400).json({ message: "ERROR: PASSWORD_INCORRECT" });
      return;
    }

    res.status(200).json({ message: "LOGIN_SUCCESS!", token: user.token });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const userData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userService.userData(userId);
    return res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      phoneNumber,
      birth,
      gender,
      isConsent,
      profileImage,
      addressId,
      postalCode,
      address,
      address1,
    } = req.body;
    const userId = req.userId;
    await userService.updateUser(
      userId,
      phoneNumber,
      birth,
      gender,
      isConsent,
      profileImage,
      addressId,
      postalCode,
      address,
      address1
    );
    return res.status(200).json({ message: "UPDATE_USER" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const userId = req.userId;

    validatePassword(password);
    validatePassword(newPassword);

    await userService.updatePassword(userId, password, newPassword);
    return res.status(200).json({ message: "UPDATE_PASSWORD" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  userLogin,
  userData,
  updateUser,
  updatePassword,
};
