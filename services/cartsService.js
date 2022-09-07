const cartsDao = require("../models/cartsDao");

const createCart = async (userId, bundleId, quantity) => {
  const isExists = await cartsDao.existCheckCart(userId, bundleId);
  if (isExists) {
    return await cartsDao.plusQuantity(userId, bundleId);
  }
  return await cartsDao.createCart(userId, bundleId, quantity);
};

const getCarts = async (userId) => {
  return await cartsDao.getCarts(userId);
};

const updateCart = async (userId, cartsId, quantity) => {
  return await cartsDao.updateCart(userId, cartsId, quantity);
};

const deleteCarts = async (userId, cartsId) => {
  return await cartsDao.deleteCarts(userId, cartsId);
};

module.exports = { createCart, getCarts, updateCart, deleteCarts };
