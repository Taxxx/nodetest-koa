const Router = require('koa-router');
const queries = require('../db/queries/reviews');

const router = new Router();
const BASE_URL = `/api/v1/reviews`;

router.get(BASE_URL, async (ctx) => {
  try {
    const reviews = await queries.getAllReviews();
    ctx.body = {
      status: 'success',
      data: reviews
    };
  } catch (err) {
    console.log(err)
  }
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    const review = await queries.getSingleReview(ctx.params.id);
    if (review.length) {
      ctx.body = {
        status: 'success',
        data: review
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That review does not exist.'
      };
    }
  } catch (err) {
    console.log(err)
  }
});

router.post(`${BASE_URL}`, async (ctx) => {
  try {
    const review = await queries.addReview(ctx.request.body);
    if (review.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: review
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
    const review = await queries.updateReview(ctx.params.id, ctx.request.body);
    if (review.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: review
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That review does not exist.'
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
    const review = await queries.deleteReview(ctx.params.id);
    if (review.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: review
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That review does not exist.'
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