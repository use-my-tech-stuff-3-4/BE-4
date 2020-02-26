
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.text('username', 128)
      .notNullable()
      .unique();
    tbl.text('password', 128)
      .notNullable();
    tbl.text('userType', 128)
      .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.deleteTableIfExists('users');
};
