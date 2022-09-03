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
    SELECT myprofile
    FROM (
    SELECT json_object(
      'email', users.email,
      'name', users.name,
      'phoneNumber', users.phoneNumber,
      'birth', users.birth,
      'gender', users.gender,
      'isConsent', users.isConsent,
      'address2', 
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'postalCode', address.postalCode,
          'address', address.address,
          'address1', address.address1
        )
      )
    )
    myprofile
    FROM address
    JOIN users ON users.id = address.user_id
    WHERE users.id = ?
    GROUP BY users.id, users.name) sub
    `,
    [userId]
  );
  return user;
};

module.exports = { createUser, userLogin, userData };
