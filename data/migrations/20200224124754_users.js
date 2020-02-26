
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments();
    tbl.text('username', 128)
      .notNullable()
      .unique();
    tbl.text('password', 128)
      .notNullable();
    tbl.text('type', 128)
      .notNullable();
  })
  .createTable('items', tbl => {
    tbl.increments();
    tbl.text('name')
      .notNullable();
    tbl.text('description')
      .notNullable();
    tbl.integer('price')
      .notNullable();
    tbl.string('price_type')
      .notNullable();
    tbl.integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('items')
  .dropTableIfExists('users');
};
