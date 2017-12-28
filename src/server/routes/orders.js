const Router = require('koa-router');
const queries = require('../db/queries/orders');

const router = new Router();
const BASE_URL = `/api/v1/orders`;

router.get(BASE_URL, async (ctx) => {
  try {
    const orders = await queries.getAllOrders();
    ctx.body = {
      status: 'success',
      data: orders
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
    const order = await queries.getSingleOrder(ctx.params.id);
    if (order.length) {
      ctx.body = {
        status: 'success',
        data: order
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That order does not exist.'
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
    const order = await queries.addOrder(ctx.request.body);
    if (order.length) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: order
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
    const order = await queries.updateOrder(ctx.params.id, ctx.request.body);
    if (order.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: order
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That order does not exist.'
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
    const order = await queries.deleteOrder(ctx.params.id);
    if (order.length) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: order
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That order does not exist.'
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