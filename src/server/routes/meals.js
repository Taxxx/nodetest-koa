const Router = require('koa-router');
const queries = require('../db/queries/meals');

const router = new Router();
const BASE_URL = `/api/v1/meals`;

router.get(BASE_URL, async (ctx) => {
  try {
    const meals = await queries.getAllMeals();
    ctx.body = {
      status: 'success',
      data: meals
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    };
  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const meal = await queries.getSingleMeal(ctx.params.id);
    if (meal.length) {
      ctx.body = {
        status: 'success',
        data: meal
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That meal does not exist.'
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

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const meal = await queries.addMeal(ctx.request.body);
    if (meal.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: meal
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
    const meal = await queries.updateMeal(ctx.params.id, ctx.request.body);
    if (meal.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: meal
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That meal does not exist.'
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
    const meal = await queries.deleteMeal(ctx.params.id);
    if (meal.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: meal
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That meal does not exist.'
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