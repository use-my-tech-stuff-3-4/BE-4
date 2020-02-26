
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1, name: 'High End Camera', description: 'Takes beautiful photos', price: 10, price_type: 'hour', user_id: 1},
        {id: 2, name: 'High End Video Game Console', description: 'Plays the best games', price: 100, price_type: 'week', user_id: 3},
        {id: 3, name: 'High End Lights', description: 'Create amazing lighting', price: 50, price_type: 'day', user_id: 4},
      ]);
    });
};
