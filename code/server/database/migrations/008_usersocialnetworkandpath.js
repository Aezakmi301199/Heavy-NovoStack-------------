/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('usersocialnetworkandpath', 
      function (table) {
          table.integer('user_id').references('id').inTable('userclient');
          table.string('vk').nullable();  
          table.string('youtube').nullable();  
          table.string('telegram').nullable();   
          table.string('path').nullable();   
          table.string('refreshtoken',800).nullable();   
          table.string('activelink').nullable(); 
        }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('usersocialnetworkandpath')
  };