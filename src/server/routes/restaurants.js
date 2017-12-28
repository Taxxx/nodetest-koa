const Router = require('koa-router');
const restaurantQueries = require('../db/queries/restaurants');
const reviewQueries = require('../db/queries/reviews');
const mealQueries = require('../db/queries/meals');

const router = new Router();
const BASE_URL = `/api/v1/restaurants`;

router.get(BASE_URL, async (ctx) => {
  try {
    const restaurants = await restaurantQueries.getAllRestaurants();
    for (const restaurant of restaurants) {
      restaurant.reviews = await reviewQueries.getReviewsByIdRestaurant(restaurant.id);
      restaurant.meals = await mealQueries.getMealsByIdRestaurant(restaurant.id);
    }
    ctx.body = {
      status: 'success',
      data: restaurants
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    };
  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const restaurant = await restaurantQueries.getSingleRestaurant(ctx.params.id);
    if (restaurant.length) {
      restaurant[0].reviews = await reviewQueries.getReviewsByIdRestaurant(ctx.params.id);
      restaurant[0].meals = await mealQueries.getMealsByIdRestaurant(ctx.params.id);
      ctx.body = {
        status: 'success',
        data: restaurant
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That restaurant does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: 'Something went wrong.'
    };
  }
});

router.get(`${BASE_URL}/avgRestaurantRating/:id`, async (ctx) => {
  try {
    const avgRating = await restaurantQueries.avgRestaurantRating(ctx.params.id);
    if (avgRating.length) {
      await restaurantQueries.updateRestaurantRating(ctx.params.id, parseFloat(avgRating).toFixed(1));
      ctx.body = {
        status: 'success',
        data: avgRating[0]
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That restaurant does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const restaurant = await restaurantQueries.addRestaurant(ctx.request.body);
    if (restaurant.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: restaurant
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const restaurant = await restaurantQueries.updateRestaurant(ctx.params.id, ctx.request.body);
    if (restaurant.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: restaurant
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That restaurant does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const restaurant = await restaurantQueries.deleteRestaurant(ctx.params.id);
    if (restaurant.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: restaurant
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That restaurant does not exist.'
      };
    }
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

module.exports = router;