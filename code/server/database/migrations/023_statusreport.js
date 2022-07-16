/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
  return knex.schema.createTable('statusreport', 
    function (table) {
        table.increments('id');
        table.string('status');
        table.string('name');
      }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const down = function(knex) {
    return knex.schema.dropTable('statusreport')
};