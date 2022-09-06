const { myDataSource } = require("./dataSource");

const checkAllproduct = async () => {
  const [Allproduct] = await myDataSource.query(
    `
    SELECT COUNT(*)
    FROM
    products
    `
  );
  return Object.values(Allproduct)[0];
};

const getProducts = async (filterType, orderByType, pagination) => {
  try {
    const products = await myDataSource.query(
      `
    SELECT 
    products.id,
    category,
    name,
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
    ${pagination}
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
    SELECT DISTINCT
      products.id,
      name,
      description,
      fixedprice,
      content,
        b.bundles,
        pi.images,
        r.reviews
    From products
    LEFT JOIN(
      SELECT
        product_id,
        JSON_ARRAYAGG(json_object(
         'id', bundle.id,
         'option', bundle.bundle_option,
         'price', bundle.price,
         'quantity', bundle.quantity
         ))as bundles
        FROM bundle
      GROUP BY product_id) b on products.id = b.product_id
    LEFT JOIN(
      SELECT 
        product_id,
          JSON_ARRAYAGG(json_object(
         'id', id,
         'image', image
         ))as images
       FROM 
      product_images
      GROUP BY product_id) pi ON products.id = pi.product_id
    LEFT JOIN(
    SELECT 
      product_id,
        JSON_ARRAYAGG(json_object(
       'id', reviews.id,
       'name', users.name,
         'content', content,
         'rating', rating,
         'created_at', created_at,
         'review_comment_id', review_comment_id
       ))as reviews
    FROM 
    reviews
    JOIN users ON users.id = reviews.user_id
    GROUP BY product_id) r ON products.id = r.product_id
    WHERE products.id = ?
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
  checkAllproduct,
};
