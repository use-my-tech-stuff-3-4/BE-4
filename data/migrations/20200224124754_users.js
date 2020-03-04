
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
    tbl.text('location', 128);
    tbl.text('email', 128);
  })
  .createTable('items', tbl => {
    tbl.increments().unsigned();
    tbl.text('name', 128)
      .notNullable();
    tbl.text('description', 128)
      .notNullable();
    tbl.integer('price')
      .notNullable();
    tbl.text('price_type', 128)
      .notNullable();
    tbl.text('img_url', 128);
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
