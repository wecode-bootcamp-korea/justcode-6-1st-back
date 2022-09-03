const productDao = require("../models/productDao");

const getProductsById = async (productId) => {
  const getProductsById = await productDao.getProductsById(productId);
  return getProductsById;
};

const getProducts = async (category, search, orderBy) => {
  const filterType = getFilterType(category, search);
  const orderByType = getOrderByType(orderBy);
  const getProductsB = await productDao.getProducts(filterType, orderByType);
  return getProductsB;
};

const getFilterType = (category, search) => {
  const FilterType = {
    CATEGORY: `WHERE category = "${category}"`,
    SEARCH: `WHERE products.name like "%${search}%"`,
    CATEGORY_AND_SEARCH: `WHERE category = "${category}" AND WHERE products.name like "%${search}%"`,
  };

  if (category && search) {
    return FilterType.CATEGORY_AND_SEARCH;
  }

  if (category) {
    return FilterType.CATEGORY;
  }

  if (search) {
    return FilterType.SEARCH;
  }

  return "";
};

const getOrderByType = (orderBy) => {
  const OrderByType = {
    LOW_PRICE: "ORDER BY fixedPrice ASC",
    HIGH_PRICE: "ORDER BY fixedPrice DESC",
    VIEW_COUNT: "ORDER BY view_count DESC",
    ORDER_COUNT: "ORDER BY order_count DESC",
  };

  if (orderBy == "lowPrice") {
    return OrderByType.LOW_PRICE;
  } else if (orderBy == "highPrice") {
    return OrderByType.HIGH_PRICE;
  } else if (orderBy == "viewCount") {
    return OrderByType.VIEW_COUNT;
  } else if (orderBy == "orderCount") {
    return OrderByType.VIEW_COUNT;
  } else return "";
};

module.exports = {
  getProducts,
  getProductsById,
};
