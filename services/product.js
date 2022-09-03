const { myDataSource } = require("../models/dataSource");
const productDao = require("../models/productDao");

const getProductsById = async (productId) => {
  const getProductsById = await productDao.getProductsById(productId);
  return getProductsById;
};

const getProducts = async (category, search, orderBy, page, pageSize) => {
  const filterType = getFilterType(category, search);
  const orderByType = getOrderByType(orderBy);
  const pagination = getStartNum(page, pageSize);

  /// 상품갯수보다 많은 페이지로 이동할경우 null반환 //
  const cntList = productDao.checkAllproduct();
  if (page > Math.round(cntList / pageSize)) {
    return null;
  }

  const getProducts = await productDao.getProducts(
    filterType,
    orderByType,
    pagination
  );

  return getProducts;
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
    return OrderByType.VIEW_COUNT;
  } else return "";
};

module.exports = {
  getProducts,
  getProductsById,
};
