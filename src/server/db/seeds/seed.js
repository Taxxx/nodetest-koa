const restaurants = require('../data/restaurants');
const reviewJson = require('../data/reviews');
const mealJson = require('../data/meals');
const orderJson = require('../data/orders');

exports.seed = async (knex, Promise) => {
  try {
    await knex('orders').del();
    await knex('reviews').del();
    await knex('meals').del();
    await knex('restaurants').del();
    await knex('restaurants').insert(restaurants);
    let restaurant = await getRestaurant(knex);
    restaurant = restaurant[0];
    reviewJson.restaurant_id = restaurant.id;
    await knex('reviews').insert(reviewJson);
    mealJson.restaurant_id = restaurant.id;
    await knex('meals').insert(mealJson);
    let meal = await getMeal(knex);
    meal = meal[0];
    orderJson.restaurant_id = restaurant.id;
    orderJson.meal_id = meal.id;
    await knex('orders').insert(orderJson);
  } catch (err) {
    console.error('ERROR: ', err);
  }
};

const getRestaurant = async (knex) => {
  return knex('restaurants').where('legalName', 'Swish Fondue')
    .then((restaurant) => {
      return restaurant;
    });
};

const getMeal = async (knex) => {
  return knex('meals').where('name', 'Special Hamburger')
    .then((meal) => {
      return meal;
    });
};