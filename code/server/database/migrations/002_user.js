/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('userclient', 
      function (table) {
          table.increments('id');
          table.string('login').notNullable().unique();
          table.string('password').notNullable();
          table.boolean('status').defaultTo(true)
        }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('userclient')
  };


