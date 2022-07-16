/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('userrole', 
      function (table) {
          table.integer('user_id').references('id').inTable('userclient');
          table.integer('role_id').references('id').inTable('role');
        }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('userrole')
  };