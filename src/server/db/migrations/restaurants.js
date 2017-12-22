exports.up = (knex, Promise) => {
  return knex.schema.createTable('restaurants', (table) => {
    table.increments();
    table.string('commercialName').notNullable().unique();
    table.integer('rating').notNullable();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('restaurants');
};