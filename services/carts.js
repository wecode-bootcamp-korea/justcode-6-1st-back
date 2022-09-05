const cartsDao = require("../models/cartsDao");

const createCarts = async (userId, bundleId, quantity) => {
  const createCarts = await cartsDao.createCarts(userId, bundleId, quantity);
  return createCarts;
};

const getCarts = async (userId) => {
  const getCarts = await cartsDao.getCarts(userId);
  return getCarts;
};

module.exports = { createCarts, getCarts };
