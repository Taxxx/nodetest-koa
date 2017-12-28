const knex = require('../connection');

function getAllRestaurants() {
  return knex('restaurants')
    .select('*');
}

function getSingleRestaurant(id) {
  return knex('restaurants')
    .select('*')
    .where({ id: parseInt(id) });
}

function avgRestaurantRating(id) {
  return knex('reviews')
    .avg('rating')
    .where({ restaurant_id: parseInt(id) });
}

function addRestaurant(restaurant) {
  return knex('restaurants')
    .insert(restaurant)
    .returning('*');
}

function updateRestaurant(id, restaurant) {
  return knex('restaurants')
    .update(restaurant)
    .where({ id: parseInt(id) })
    .returning('*');
}

function updateRestaurantRating(id, rating) {
  return knex('restaurants')
    .where('id', '=', id)
    .update({
      rating: rating
    })
}

function deleteRestaurant(id) {
  return knex('restaurants')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
  addRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getSingleRestaurant,
  updateRestaurant,
  avgRestaurantRating,
  updateRestaurantRating
};