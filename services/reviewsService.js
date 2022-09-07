const reviewsDao = require("../models/reviewsDao");

const createReviews = async (userId, productId, content, rating) => {
  const reviewsCheck = await reviewsDao.reviewsCheck(userId, productId);

  if (!reviewsCheck) {
    return await reviewsDao.createReviews(userId, productId, content, rating);
  } else {
    return false;
  }
};

const getReviews = async (userId) => {
  const getReviews = await reviewsDao.getReviews(userId);
  return getReviews;
};

const updateReviews = async (userId, reviewsId, content, rating) => {
  return await reviewsDao.updateReviews(userId, reviewsId, content, rating);
};

const deleteReviews = async (userId, reviewsId) => {
  return await reviewsDao.deleteReviews(userId, reviewsId);
};

module.exports = { createReviews, getReviews, updateReviews, deleteReviews };
