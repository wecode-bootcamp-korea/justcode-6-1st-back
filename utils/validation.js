const validateEmail = (email) => {
  const validate = new xRegExp(
    /^[A-Za-z0-9\.\-]+\@[A-Za-z0-9\.\-]+\.[A-Za-z0-9\.\-]+$/
  );
  if (!validate.test(email)) {
    const err = new Error("EMAIL_INVALID");
    err.statusCode = 400;
    throw err;
  }
};

const validatePassword = (password) => {
  if (password.length < 10) {
    const err = new Error("PASSWORD_INVALID");
    err.statusCode = 400;
    throw err;
  }
};

const validateNumber = (phoneNumber) => {
  const validate = new xRegExp(/^\d{10,11}$/);
  if (!validate.test(phoneNumber)) {
    const err = new Error("PHONENUMBER_INVALID");
    err.statusCode = 400;
    throw err;
  }
};
