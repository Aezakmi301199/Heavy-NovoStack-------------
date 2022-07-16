export const up = function(knex) {
 return knex.schema.createTable('brand', 
   function (table) {
       table.increments('id');
       table.string('category').references('category').inTable('category');
       table.string('brand');
     }
 )
};
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
    return knex.schema.dropTable('brand')
};