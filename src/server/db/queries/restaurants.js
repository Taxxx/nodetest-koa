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
  updateRestaurant
};