const knex = require('../connection');

function getAllOrders() {
  return knex('orders')
    .select('*');
}

function getSingleOrder(id) {
  return knex('orders')
    .select('*')
    .where({ id: parseInt(id) });
}

function addOrder(order) {
  return knex('orders')
    .insert(order)
    .returning('*');
}

function updateOrder(id, order) {
  return knex('orders')
    .update(order)
    .where({ id: parseInt(id) })
    .returning('*');
}

function deleteOrder(id) {
  return knex('orders')
    .del()
    .where({ id: parseInt(id) })
    .returning('*');
}

module.exports = {
  addOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder
};