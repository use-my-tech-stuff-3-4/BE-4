const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('testing123', 8);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test1', password: hash, type: 'renter'},
        {id: 2, username: 'test2', password: hash, type: 'renter'},
        {id: 3, username: 'test3', password: hash, type: 'owner'},
        {id: 4, username: 'test4', password: hash, type: 'owner'}
      ]);
    });
};
