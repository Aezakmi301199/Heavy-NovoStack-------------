/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('pictureadvertisment', 
      function (table) {
          table.increments('id');
          table.integer('advert_id');
          table.string('path');
        }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('pictureadvertisment')
  };