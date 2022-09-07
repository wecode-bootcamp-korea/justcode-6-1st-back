const { myDataSource } = require("./dataSource");

const createReviews = async (userId, productId, content, rating) => {
  return await myDataSource.query(
    `
    INSERT INTO reviews (user_id, product_id, content, rating) VALUE (?,?,?,?)
    `,
    [userId, productId, content, rating]
  );
};

const reviewsCheck = async (userId, productId) => {
  const [user] = await myDataSource.query(
    `
    SELECT *
    FROM reviews
    WHERE user_id = ${userId} AND product_id = ${productId}
  `
  );
  return user;
};

const getReviews = async (userId) => {
  return await myDataSource.query(
    `
      SELECT
        reviews.id as reviewsId,
        reviews.content as review,
        reviews.rating as rating,
        reviews.created_at as createdAt,
        reviews.product_id as productId,
        products.name as productName,
        products.image_thumbnail as productImage
      FROM reviews
      JOIN users ON users.id = user_id
      JOIN products on products.id = product_id
      WHERE user_id = ${userId}
    `
  );
};

const updateReviews = async (userId, reviewsId, content, rating) => {
  return await myDataSource.query(
    `
      UPDATE
      reviews
      SET
        content = '${content}',
        rating = ${rating}
      WHERE user_id = ${userId} AND reviews.id = ${reviewsId}
    `
  );
};

const deleteReviews = async (userId, reviewsId) => {
  return await myDataSource.query(
    `
      DELETE
      FROM
      reviews
      WHERE user_id = ${userId} AND reviews.id = ${reviewsId}
    `
  );
};

module.exports = {
  createReviews,
  reviewsCheck,
  getReviews,
  updateReviews,
  deleteReviews,
};
