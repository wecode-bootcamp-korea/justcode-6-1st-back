const productDao = require("../models/productDao");

const getProductById = async (productId) => {
  const getProductById = await productDao.getProductById(productId);
  for (const obj of getProductById) {
    obj.bundles = JSON.parse(obj.bundles);
    obj.images = JSON.parse(obj.images);
    obj.reviews = JSON.parse(obj.reviews);
  }

  return getProductById;
};

const getProducts = async (category, search, orderBy, page, pageSize) => {
  const filterType = getFilterType(category, search);
  const orderByType = getOrderByType(orderBy);
  const pagination = getStartNum(page, pageSize);

  const cntList = productDao.countAllProducts();
  if (page > Math.ceil(cntList / pageSize)) {
    return null;
  }

  return await productDao.getProducts(filterType, orderByType, pagination);
};

const getStartNum = (page, pageSize) => {
  let start = 0;

  if (page <= 0 || !page) {
    page = 1;
  } else {
    start = (page - 1) * pageSize;
  }

  if (!pageSize) {
    return "";
  }

  return `LIMIT ${start},${pageSize}`;
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
    return OrderByType.ORDER_COUNT;
  } else return "";
};

module.exports = {
  getProducts,
  getProductById,
};
