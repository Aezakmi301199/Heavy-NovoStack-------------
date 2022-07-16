/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('messageuser', 
      function (table) {
          table.increments('id');
          table.integer('user_id').references('id').inTable('userclient');
          table.string('messagetext');
          table.string('chatroom_id').notNullable();
          table.timestamp('create_at').defaultTo(knex.fn.now())
        }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('messageuser')
  };