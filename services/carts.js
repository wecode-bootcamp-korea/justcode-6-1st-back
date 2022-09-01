const cartsDao = require("../models/cartsDao");

const creatCarts = async (product, arrivedAt, deliveryCharge, quantity) => {
  const creatCarts = await cartsDao.creatCarts(
    product,
    arrivedAt,
    deliveryCharge,
    quantity
  );
  return creatCarts;
};

module.exports = { creatCarts };
