const { myDataSource } = require("../utils/dataSource");

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
    INSERT INTO users(email, password, name, phone_number, birth, gender, isConsent, profile_image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      email,
      hashedPw,
      name,
      phoneNumber,
      birth,
      gender,
      consent,
      "https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ]
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
      users.phone_number as "phoneNumber",
      users.birth as "birth",
      users.gender as "gender",
      users.isConsent as "isConsent",
      users.profile_image as "profilePicture",
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
            'postalCode', address.postal_code,
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
            'pointId', points.id,
            'point', points.point,
            'history', points.history,
            'createdAt', points.created_at
          )
        ) as point
      FROM points
      GROUP BY user_id )
    p ON users.id = p.user_id

    LEFT JOIN (
      SELECT
        user_id,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'orderNumber', orders.order_number,
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

const updateUser = async (
  userId,
  phoneNumber,
  birth,
  gender,
  isConsent,
  profileImage
) => {
  return await myDataSource.query(
    `
      UPDATE
      users
      SET
        phone_number = ${phoneNumber},
        birth = ${birth},
        gender = '${gender}',
        isConsent = ${isConsent},
        profile_image = '${profileImage}'
      WHERE id = ${userId}
    `
  );
};

const updateAddress = async (
  addressId,
  userId,
  postalCode,
  address,
  address1
) => {
  return await myDataSource.query(
    `
      UPDATE
      address
      SET
        postal_code = ${postalCode},
        address = '${address}',
        address1 = '${address1}'
      WHERE id = ${addressId} AND user_id = ${userId}
    `
  );
};

const userDatabyId = async (userId) => {
  const [user] = await myDataSource.query(
    `
    SELECT *
    FROM users
    WHERE id = ${userId}
  `
  );
  return user;
};

const updatePassword = async (userId, hashedPw) => {
  return await myDataSource.query(
    `
      UPDATE
      users
      SET
        password = '${hashedPw}'
      WHERE id = ${userId}
    `
  );
};

module.exports = {
  createUser,
  userLogin,
  userData,
  updateUser,
  updateAddress,
  userDatabyId,
  updatePassword,
};
