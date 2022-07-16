/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
  return knex.schema.createTable('typereport', 
    function (table) {
        table.increments('id');
        table.string('type');
        table.string('name');
      }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const down = function(knex) {
    return knex.schema.dropTable('typereport')
};