const productDao = require("../models/productDao");

const getProducts = async () => {
  const getProducts = await productDao.getProducts();
  return getProducts;
};

const getProductsById = async (productId) => {
  const getProductsById = await productDao.getProductsById(productId);
  return getProductsById;
};

//기본순서는 주문이 많은 순으로
const getProductsByCategory = async (category, orderBy) => {
  if (orderBy === "price") {
    const getProductsByCategoryPrice =
      await productDao.getProductsByCategoryPrice(category);
    return getProductsByCategoryPrice;
  } else if (orderBy === "view") {
    const getProductsByCategoryView =
      await productDao.getProductsByCategoryView(category);
    return getProductsByCategoryView;
  } else {
    const getProductsByCategoryOrder =
      await productDao.getProductsByCategoryOrder(category);
    return getProductsByCategoryOrder;
  }
};

const getProductsBySearch = async (word) => {
  const getProductsBySearch = await productDao.getProductsBySearch(word);
  return getProductsBySearch;
};

module.exports = {
  getProducts,
  getProductsById,
  getProductsByCategory,
  getProductsBySearch,
};
