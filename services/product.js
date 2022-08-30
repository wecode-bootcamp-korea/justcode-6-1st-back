const productDao = require("../models/productDao");

const getProducts = async () => {
  const getProducts = await productDao.getProducts();
  return getProducts;
};

module.exports = { getProducts };
