const { myDataSource } = require('../utils/dataSource');

const createCart = async (userId, bundleId, quantity) => {
  try {
    await myDataSource.query(
      `
    INSERT INTO carts (user_id, bundle_id, quantity) VALUE (?,?,?)
    `,
      [userId, bundleId, quantity]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = '500';
    throw error;
  }
};

const getCartInfo = async (userId) => {
  try {
    const carts = await myDataSource.query(
      `
      SELECT
        carts.id as id,
        products.productor as brandName,
        products.name as itemName,
        products.image_thumbnail as img,
        bundle.bundle_option as options,
        bundle.price as price,
        carts.quantity,
        bundle.price * carts.quantity as priceByCart
      FROM
      carts
      JOIN bundle ON bundle_id = bundle.id
      JOIN products on products.id = bundle.product_id
      WHERE carts.user_id = ${userId}
      `
    );
    return carts;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = '500';
    throw error;
  }
};

const getCartDetailInfo = async (userId) => {
  try {
    const totalPriceAndQuantity = await myDataSource.query(
      `
      SELECT
      users.name,
      SUM(bundle.price*carts.quantity) as total_price,
      SUM(carts.quantity) as total_quantity
      FROM
      carts
      JOIN users ON users.id = carts.user_id
      JOIN bundle ON bundle_id = bundle.id
      JOIN products on products.id = bundle.product_id
      WHERE carts.user_id = ${userId}
      `
    );
    return totalPriceAndQuantity;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = '500';
    throw error;
  }
};

const updateCart = async (userId, cartsId, quantity) => {
  try {
    const updateCart = await myDataSource.query(
      `
      UPDATE
       carts
      SET
        quantity = quantity + ${quantity}
      WHERE user_id = ${userId} AND carts.id = ${cartsId}
    `
    );
    return updateCart;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = '500';
    throw error;
  }
};

const deleteCart = async (userId, cartsId) => {
  try {
    const deleteCart = await myDataSource.query(
      `
      DELETE
      FROM
      carts
      WHERE user_id = ${userId} AND carts.id = ${cartsId}
    `
    );
    return deleteCart;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = '500';
    throw error;
  }
};

const existCheckCart = async (userId, bundleId) => {
  try {
    const carts = await myDataSource.query(
      `
    SELECT exists (
      SELECT
      *
      FROM
      carts
      WHERE user_id = ${userId} AND bundle_id = ${bundleId}
      ) AS isExists
    `
    );
    return +carts[0].isExists; // + 붙이면 true false  반환
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = '500';
    throw error;
  }
};

const plusQuantity = async (userId, bundleId) => {
  try {
    const updateCart = await myDataSource.query(
      `
      UPDATE
       carts
      SET
        quantity = quantity + 1
      WHERE user_id = ${userId} AND bundle_id = ${bundleId}
    `
    );
    return updateCart;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = '500';
    throw error;
  }
};

module.exports = {
  createCart,
  getCartInfo,
  getCartDetailInfo,
  updateCart,
  deleteCart,
  existCheckCart,
  plusQuantity,
};
