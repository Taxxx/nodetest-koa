const Router = require('koa-router');
const queries = require('../db/queries/restaurants');

const router = new Router();
const BASE_URL = `/api/v1/restaurants`;

router.get(BASE_URL, async (ctx) => {
  try {
    const restaurants = await queries.getAllRestaurants();
    ctx.body = {
      status: 'success',
      data: restaurants
    };
  } catch (err) {
    console.log(err)
  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const restaurant = await queries.getSingleRestaurant(ctx.params.id);
    if (restaurant.length) {
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
    console.log(err)
  }
});

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const restaurant = await queries.addRestaurant(ctx.request.body);
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
    const restaurant = await queries.updateRestaurant(ctx.params.id, ctx.request.body);
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
    const restaurant = await queries.deleteRestaurant(ctx.params.id);
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