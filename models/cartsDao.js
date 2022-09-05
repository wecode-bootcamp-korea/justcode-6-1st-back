const { myDataSource } = require("./dataSource");

const createCarts = async (userId, bundleId, quantity) => {
  try {
    const creatCarts = await myDataSource.query(
      `
    INSERT INTO carts (user_id, bundle_id, quantity) VALUE (?,?,?)
    `,
      [userId, bundleId, quantity]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

const getCarts = async (userId) => {
  try {
    const getCarts = await myDataSource.query(
      `
    SELECT
    carts.id,
    products.name,
    bundle.bundle_option,
    bundle.price,
    carts.quantity
    FROM
    carts
    JOIN bundle on bundle_id = bundle.id
    JOIN products on products.id = bundle.product_id
    WHERE user_id = ${userId}
    `
    );
    return getCarts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

module.exports = { createCarts, getCarts };
