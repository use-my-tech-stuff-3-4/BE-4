const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('testing123', 8);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'test1', password: hash, type: 'renter', location: 'Saratoga Springs, Utah', email: 'test@test.com'},
        {username: 'test2', password: hash, type: 'renter', location: 'New York, New York', email: 'test@test.com'},
        {username: 'test3', password: hash, type: 'owner', location: 'Los Angeles, California', email: 'test@test.com'},
        {username: 'test4', password: hash, type: 'owner', location: 'Meridian, Idaho', email: 'test@test.com'}
      ]);
    });
};
