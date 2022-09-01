const { myDataSource } = require("./dataSource");

const getProducts = async () => {
  try {
    const getProducts = await myDataSource.query(
      `
    SELECT 
      products.id as product_id,
      category,
      name,
      description,
      productor,
      image_thumbnail,
      bundle.price,
      created_at
    FROM products
    JOIN bundle ON products.id = bundle.product_id
    WHERE bundle.bundle_name = "소"
    `
    );
    return getProducts;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

const getProductsById = async (productId) => {
  try {
    const getProductsById = await myDataSource.query(
      `
    SELECT 
      products.id as product_id,
      category,
      name,
      description,
      productor,
      image_thumbnail,
      bundle.price,
      created_at
    FROM products
    JOIN bundle ON products.id = bundle.product_id
    WHERE bundle.bundle_name = "소" AND products.id = ?
    `,
      [productId]
    );
    return getProductsById;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

// 카테고리별 리스트 = 가격순
const getProductsByCategoryPrice = async (category, orderBy) => {
  try {
    const getProductsByCategory = await myDataSource.query(
      `
    SELECT 
      products.id as product_id,
      category,
      name,
      description,
      productor,
      image_thumbnail,
      bundle.price,
      created_at,
      view_count,
      order_count
    FROM products
    JOIN bundle ON products.id = bundle.product_id
    WHERE bundle.bundle_name = "소" AND category = "${category}"
    ORDER BY bundle.price DESC
    `
    );
    return getProductsByCategory;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

// 카테고리별 리스트 = 조회순
const getProductsByCategoryView = async (category, orderBy) => {
  try {
    const getProductsByCategory = await myDataSource.query(
      `
    SELECT 
      products.id as product_id,
      category,
      name,
      description,
      productor,
      image_thumbnail,
      bundle.price,
      created_at,
      view_count,
      order_count
    FROM products
    JOIN bundle ON products.id = bundle.product_id
    WHERE bundle.bundle_name = "소" AND category = "${category}"
    ORDER BY view_count DESC
    `
    );
    return getProductsByCategory;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

// 카테고리별 리스트 = 구매순
const getProductsByCategoryOrder = async (category, orderBy) => {
  try {
    const getProductsByCategory = await myDataSource.query(
      `
    SELECT 
      products.id as product_id,
      category,
      name,
      description,
      productor,
      image_thumbnail,
      bundle.price,
      created_at,
      view_count,
      order_count
    FROM products
    JOIN bundle ON products.id = bundle.product_id
    WHERE bundle.bundle_name = "소" AND category = "${category}"
    ORDER BY order_count DESC
    `
    );
    return getProductsByCategory;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

// 사용하려다가 실패한 코드... 나중에 사용법을 더 익힌 후 리팩토링 예정
// CASE WHEN ${orderBy} = price THEN bundle.price END DESC
// CASE WHEN ${orderBy} = view THEN products.view_count END ASC,
// CASE WHEN ${orderBy} = order THEN bundle.price END,
// CASE WHEN ${orderBy} IS NULL THEN products.id END

const getProductsBySearch = async (word) => {
  try {
    const getProductsBySearch = await myDataSource.query(
      `
    SELECT 
      products.id as product_id,
      category,
      name,
      description,
      productor,
      image_thumbnail,
      bundle.price,
      created_at
      FROM products
    JOIN bundle ON products.id = bundle.product_id
    WHERE products.name like "%${word}%" AND bundle.price = "10000"
  `
    );
    return getProductsBySearch;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = "500";
    throw error;
  }
};

module.exports = {
  getProducts,
  getProductsById,
  getProductsByCategoryPrice,
  getProductsByCategoryView,
  getProductsByCategoryOrder,
  getProductsBySearch,
};
