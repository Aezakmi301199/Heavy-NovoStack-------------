/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
  return knex.schema.createTable('report', 
    function (table) {
        table.increments('id');
        table.integer('user_id');
        table.string('intruder_login');
        table.string('reason');
        table.string('email');
        table.string('message');
        table.string('type');
        table.string('status');
        table.string('comment_admin');
      }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const down = function(knex) {
    return knex.schema.dropTable('report')
};