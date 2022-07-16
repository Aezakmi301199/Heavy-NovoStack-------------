/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('userinfo', 
      function (table) {
          table.integer('user_id').references('id').inTable('userclient');
          table.string('first_name').nullable();
          table.string('last_name').nullable();
          table.integer('age').nullable();
          table.string('gender').nullable();
          table.string('phone').nullable();
          table.string('email').notNullable();
          table.boolean('confirmed').defaultTo(false);
          table.string('country').nullable();
          table.string('city').nullable();
          table.timestamp('create_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').nullable();
        }
    )           
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('userinfo')
  };