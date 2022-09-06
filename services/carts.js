const cartsDao = require("../models/cartsDao");

const createCarts = async (userId, bundleId, quantity) => {
  const isExists = await cartsDao.existCart(userId, bundleId);
  if (isExists) {
    return await cartsDao.plusQuantity(userId, bundleId);
  }
  const createCarts = await cartsDao.createCarts(userId, bundleId, quantity);
  return createCarts;
};

const getCarts = async (userId) => {
  const getCarts = await cartsDao.getCarts(userId);
  return getCarts;
};

const updateCarts = async (userId, cartsId, quantity) => {
  const updateCarts = await cartsDao.updateCarts(userId, cartsId, quantity);
  return updateCarts;
};

const deleteCarts = async (userId, cartsId) => {
  const deleteCarts = await cartsDao.deleteCarts(userId, cartsId);
  return deleteCarts;
};

module.exports = { createCarts, getCarts, updateCarts, deleteCarts };
