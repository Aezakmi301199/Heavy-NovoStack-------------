/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
    return knex.schema.createTable('advertisment', 
      function (table) {
          table.increments('id');
          table.integer('user_id').references('id').inTable('userclient');
          table.string('category').references('category').inTable('category');
          table.integer('mileage');
          table.string('title').notNullable();
          table.string('exposition',3000).nullable()
          table.string('brand');
          table.integer('cost').nullable()
          table.string('location').nullable();
          table.timestamp('create_at').defaultTo(knex.fn.now())
        }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
      return knex.schema.dropTable('advertisment')
  };