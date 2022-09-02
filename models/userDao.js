const { myDataSource } = require("./dataSource");

const createUser = async (
  email,
  hashedPw,
  name,
  phoneNumber,
  birth,
  gender
) => {
  const user = await myDataSource.query(
    `
    INSERT INTO users(email, password, name, phoneNumber, birth, gender)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [email, hashedPw, name, phoneNumber, birth, gender]
  );
  return user;
};

const userLogin = async (email) => {
  const [user] = await myDataSource.query(
    `
    SELECT
      id,
      email,
      password
    FROM users
    WHERE email = ?
  `,
    [email]
  );
  return user;
};

module.exports = { createUser, userLogin };
