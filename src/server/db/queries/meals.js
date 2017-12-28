const knex = require('../connection');

function getAllMeals() {
  return knex('meals')
    .select('*');
}

function getSingleMeal(id) {
  return knex('meals')
    .select('*')
    .where({ id: parseInt(id) });
}

function getMealsByIdRestaurant(restaurant_id) {
  return knex('meals')
    .select('name', 'description', 'price')
    .where({ restaurant_id: parseInt(restaurant_id) });
}

function addMeal(meal) {
  return knex('meals')
    .insert(meal)
    .returning('*');
}

function updateMeal(id, meal) {
  return knex('meals')
    .update(meal)
    .where({ id: parseInt(id) })
    .returning('*');
}

function deleteMeal(id) {
  return knex('meals')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
  addMeal,
  deleteMeal,
  getAllMeals,
  getSingleMeal,
  updateMeal,
  getMealsByIdRestaurant
};