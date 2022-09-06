const { myDataSource } = require("./dataSource");

const createUser = async (
  email,
  hashedPw,
  name,
  phoneNumber,
  birth,
  gender,
  consent
) => {
  const user = await myDataSource.query(
    `
    INSERT INTO users(email, password, name, phoneNumber, birth, gender, isConsent)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    [email, hashedPw, name, phoneNumber, birth, gender, consent]
  );
  return user;
};

const userLogin = async (email) => {
  const [user] = await myDataSource.query(
    `
    SELECT *
    FROM users
    WHERE email = ?
  `,
    [email]
  );
  return user;
};

const userData = async (userId) => {
  const user = await myDataSource.query(
    `
    SELECT
      u.id as "userId",
      u.email as "email",
      u.name as "name",
      u.phoneNumber as "phoneNumber",
      u.birth as "birth",
      u.gender as "gender",
      u.isConsent as "isConsent",
      a.id as "addressId",
      a.postalCode as "postalCode",
      a.address as "address",
      a.address1 as "address1"
    FROM users u
    INNER JOIN address a ON a.user_id = u.id
    WHERE u.id = ${userId}
    order by a.id`
  );
  return user;
};

module.exports = { createUser, userLogin, userData };
