exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('restaurants', (table) => {
      table.increments('id').primary();
      table.string('commercialName');
      table.string('legalName').notNullable().unique();
      table.string('logo');
      table.string('commercialEmail').notNullable().unique();
      table.string('adminNumber').notNullable().unique();
      table.string('address');
      table.float('rating', 1, 1).notNullable();
    }),
    knex.schema.createTable('reviews', (table) => {
      table.increments('id').primary();
      table.integer('restaurant_id').references('restaurants.id');
      table.string('name').notNullable();
      table.string('review').notNullable();
      table.float('rating', 1, 1).notNullable();
    }),
    knex.schema.createTable('meals', (table) => {
      table.increments('id').primary();
      table.integer('restaurant_id').references('restaurants.id');
      table.string('name').notNullable();
      table.string('description').notNullable();
      table.float('price', 4, 2).notNullable();
    }),
    knex.schema.createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('restaurant_id').references('restaurants.id');
      table.integer('meal_id').references('meals.id');
      table.string('address').notNullable();
      table.float('price', 4, 2).notNullable();
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('reviews'),
    knex.schema.dropTable('orders'),
    knex.schema.dropTable('meals'),
    knex.schema.dropTable('restaurants')
  ]);
};