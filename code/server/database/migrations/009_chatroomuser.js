/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('chatroomuser', 
      function (table) {
          table.increments('id');
          table.integer('user_id1').references('id').inTable('userclient'); 
          table.integer('user_id2').references('id').inTable('userclient'); 
          table.string('chatroom_id').unique();
        }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('chatroomuser')
  };