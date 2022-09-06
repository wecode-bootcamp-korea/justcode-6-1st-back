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
    SELECT DISTINCT
      users.id as "userId",
      users.email as "email",
      users.name as "name",
      users.phoneNumber as "phoneNumber",
      users.birth as "birth",
      users.gender as "gender",
      users.isConsent as "isConsent",
      users.profilePicture as "profilePicture",
        a.address,
        p.point,
        o.orderList,
        r.reviews
    FROM users
    LEFT JOIN (
      SELECT
        user_id,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'addressId', address.id,
            'postalCode', address.postalCode,
            'address', address.address,
            'address1', address.address1
          )
        ) as address
      FROM address
      GROUP BY user_id )
    a ON users.id = a.user_id
    LEFT JOIN (
      SELECT
        user_id,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'pointId', point.id,
            'point', point.point,
            'history', point.history,
            'createdAt', point.created_at
          )
        ) as point
      FROM point
      GROUP BY user_id )
    p ON users.id = p.user_id
    LEFT JOIN (
      SELECT
        user_id,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'orderNumber', orders.orderNumber,
            'productId', products.id,
            'productName', products.name,
            'imageThumbnail', products.image_thumbnail,
            'fixedPrice', products.fixedPrice,
            'createdAt', orders.created_at
          )
        ) as orderList
      FROM orders
      JOIN products ON products.id = orders.product_id
      GROUP BY user_id )
    o ON users.id = o.user_id
    LEFT JOIN (
      SELECT
        user_id,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'reviewId', reviews.id,
            'productId', products.id,
            'productName', products.name,
            'imageThumbnail', products.image_thumbnail,
            'review', reviews.content,
            'rating', reviews.rating,
            'createdAt', reviews.created_at
          )
        ) as reviews
      FROM reviews
      JOIN products ON products.id = reviews.product_id
      GROUP BY user_id )
    r ON users.id = r.user_id
    WHERE users.id = ${userId}
    `
  );
  return user;
};

module.exports = { createUser, userLogin, userData };
