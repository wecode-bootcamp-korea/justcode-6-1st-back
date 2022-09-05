const cartsDao = require("../models/cartsDao");

const createCarts = async (userId, bundleId, quantity) => {
  const createCarts = await cartsDao.createCarts(userId, bundleId, quantity);
  return createCarts;
};

const getCarts = async (userId) => {
  const getCarts = await cartsDao.getCarts(userId);
  return getCarts;
};

const updateCarts = async (cartsId, quantity) => {
  const updateCarts = await cartsDao.updateCarts(cartsId, quantity);
  return updateCarts;
};

const deleteCarts = async (cartsId) => {
  const deleteCarts = await cartsDao.deleteCarts(cartsId);
  return deleteCarts;
};

module.exports = { createCarts, getCarts, updateCarts, deleteCarts };
