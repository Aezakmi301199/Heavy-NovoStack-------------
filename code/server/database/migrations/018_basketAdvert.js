/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('basket', 
      function (table) {
          table.increments('id');
          table.integer('user_id').references('id').inTable('userclient');
          table.integer('advert_id').references('id').inTable('advertisment');

        }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('basket')
  };