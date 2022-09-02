const { myDataSource } = require("./dataSource");

const getProducts = async (filterType, orderByType) => {
  try {
    const products = await myDataSource.query(
      `
    SELECT 
    products.id,
    category,
    name,
      JSON_ARRAYAGG(json_object(
       'id', bundle.id,
       'option', bundle.bundle_option,
       'price', bundle.price,
       'quantity', bundle.quantity
       ))as bundle,
    description,
    productor,
    fixedPrice,
    image_thumbnail,
    view_count, 
    order_count,
    created_at
    FROM products
    JOIN bundle ON products.id = bundle.product_id
    ${filterType}
    GROUP BY products.id
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
      products.id,
      category,
      name,
        JSON_ARRAYAGG(json_object(
         'id', bundle.id,
         'option', bundle.bundle_option,
         'price', bundle.price,
         'quantity', bundle.quantity
         ))as bundle,
      description,
      productor,
      fixedPrice,
      image_thumbnail,
      view_count, 
      order_count,
      created_at
      FROM products
      JOIN bundle ON products.id = bundle.product_id
      WHERE products.id = ?
      GROUP BY products.id
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
