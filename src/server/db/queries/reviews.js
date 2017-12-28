const knex = require('../connection');

function getAllReviews() {
  return knex('reviews')
    .select('*');
}

function getSingleReview(id) {
  return knex('reviews')
    .select('*')
    .where({ id: parseInt(id) });
}

function getReviewsByIdRestaurant(restaurant_id) {
  return knex('reviews')
    .select('name', 'review', 'rating')
    .where({ restaurant_id: parseInt(restaurant_id) });
}

function addReview(review) {
  return knex('reviews')
    .insert(review)
    .returning('*');
}

function updateReview(id, review) {
  return knex('reviews')
    .update(review)
    .where({ id: parseInt(id) })
    .returning('*');
}

function deleteReview(id) {
  return knex('reviews')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
  addReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  getReviewsByIdRestaurant
};