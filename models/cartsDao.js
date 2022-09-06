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
    const DELIVERY_FEE = 3500;
    const FREE_DELIVERY_PRICE = 50000;

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

    const totalPriceAndQuantity = await myDataSource.query(
      `
      SELECT
      SUM(bundle.price*carts.quantity) as total_price,
      SUM(carts.quantity) as total_quantity
      FROM
      carts
      JOIN bundle ON bundle_id = bundle.id
      JOIN products on products.id = bundle.product_id
      WHERE carts.user_id = ${userId}
      `
    );

    const totalPrice = Number(totalPriceAndQuantity[0].total_price);

    const deliveryFeeByCart = () => {
      const totalPriceBycart = carts.map((cart) => cart.priceByCart);
      let result = [];
      for (let i = 0; i < totalPriceBycart.length; i++) {
        if (totalPriceBycart[i] < FREE_DELIVERY_PRICE) {
          result.push(DELIVERY_FEE);
        }
      }
      const totalDeliveryFee = result.reduce((prev, curr) => prev + curr, 0);
      return totalDeliveryFee;
    };

    const totalDeliveryFee = Number(deliveryFeeByCart());

    return {
      cartList: carts,
      totalPrice: totalPrice,
      totalQantity: Number(totalPriceAndQuantity[0].total_quantity),
      deliveryFee: totalDeliveryFee,
      orderPrice: totalPrice + totalDeliveryFee,
    };
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

const updateCarts = async (userId, cartsId, quantity) => {
  try {
    const updateCarts = await myDataSource.query(
      `
      UPDATE
       carts
      SET
        quantity = quantity + ${quantity}
      WHERE user_id = ${userId} AND carts.id = ${cartsId}
    `
    );
    return updateCarts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

const deleteCarts = async (userId, cartsId) => {
  try {
    const deleteCarts = await myDataSource.query(
      `
      DELETE
      FROM
      carts
      WHERE user_id = ${userId} AND carts.id = ${cartsId}
    `
    );
    return deleteCarts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

const existCart = async (userId, bundleId) => {
  try {
    const result = await myDataSource.query(
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
    return +result[0].isExists; // + 붙이면 true false  반환
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

const plusQuantity = async (userId, bundleId) => {
  try {
    const updateCarts = await myDataSource.query(
      `
      UPDATE
       carts
      SET
        quantity = quantity + 1
      WHERE user_id = ${userId} AND bundle_id = ${bundleId}
    `
    );
    return updateCarts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

module.exports = {
  createCarts,
  getCarts,
  updateCarts,
  deleteCarts,
  existCart,
  plusQuantity,
};
