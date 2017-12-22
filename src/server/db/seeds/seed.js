exports.seed = (knex, Promise) => {
  return knex('restaurants').del()
    .then(() => {
      return knex('restaurants').insert({
        commercialName: 'El Arriero',
        rating: 7
      });
    })
    .then(() => {
      return knex('restaurants').insert({
        commercialName: 'Dumbo',
        rating: 2
      });
    })
    .then(() => {
      return knex('restaurants').insert({
        commercialName: 'Yoshikos',
        rating: 5
      });
    });
};