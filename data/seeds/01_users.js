const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('testing123', 8);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test1', password: hash, type: 'renter', location: 'Saratoga Springs, Utah', email: 'test@test.com'},
        {id: 2, username: 'test2', password: hash, type: 'renter', location: 'New York, New York', email: 'test@test.com'},
        {id: 3, username: 'test3', password: hash, type: 'owner', location: 'Los Angeles, California', email: 'test@test.com'},
        {id: 4, username: 'test4', password: hash, type: 'owner', location: 'Meridian, Idaho', email: 'test@test.com'}
      ]);
    });
};
