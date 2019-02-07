// migrate:make users --knexfile ./db/config.js
exports.up = function(knex) {
  return knex.schema.createTable('users',(table)=>{
    table.increments('user_id').notNull().primary();
    table.string('display_name').notNull();
    table.string('account_type');
    table.string('email').unique().notNull();
    table.string('hash').notNull();
    table.timestamps();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
