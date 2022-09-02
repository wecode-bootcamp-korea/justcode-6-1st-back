const { myDataSource } = require("./dataSource");

const getProducts = async (filterType, orderByType) => {
  try {
    const products = await myDataSource.query(
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
    ${filterType}
    ${orderByType}
    `
    );
    return products;
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
    WHERE bundle.bundle_option = "소" AND products.id = ?
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

module.exports = {
  getProducts,
  getProductsById,
};
