// migrate:make users --knexfile ./db/config.js
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users',(table)=>{
    table.increments().notNull().primary();
    table.string('name').notNull();
    table.string('hash').notNull();
    table.string('salt').notNull();
    table.timeStamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
