
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test1', password: '54321', userType: 'renter'},
        {id: 2, username: 'test2', password: '12345', userType: 'renter'},
        {id: 3, username: 'test3', password: '98765', userType: 'owner'},
        {id: 4, username: 'test4', password: '56789', userType: 'owner'}
      ]);
    });
};
