const { myDataSource } = require("../utils/dataSource");

const createUser = async (email, password, name) => {
  await myDataSource.query(
    `INSERT INTO users (
      email,
      password,
      name
    ) VALUES (?,?,?)`,
    [email, password, name]
  );
};

const getUserByEmail = async (email) => {
  const [user] = await myDataSource.query(
    `SELECT *
     FROM users
     WHERE users.email = ?`,

    [email]
  );

  return user;
};

const getUserById = async (id) => {
  const [user] = await myDataSource.query(
    `SELECT *
     FROM users
     WHERE users.id = ?
    `,
    [id]
  );
  return user;
};

module.exports = { createUser, getUserByEmail, getUserById };
