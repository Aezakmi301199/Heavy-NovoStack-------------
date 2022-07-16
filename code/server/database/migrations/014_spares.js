/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
  return knex.schema.createTable('spares', 
    function (table) {
        table.increments('id');
        table.string('category');
        table.string('subcategory');
        table.string('value').notNullable();
      }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const down = function(knex) {
    return knex.schema.dropTable('spares')
};
