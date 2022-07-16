export const up = function(knex) {
 return knex.schema.createTable('undercategories', 
   function (table) {
       table.increments('id');
       table.string('category').references('category').inTable('category')
       table.string('subcategory').notNullable();
       table.string('subcategorytype').notNullable();
       table.integer('min');
       table.integer('max');
       table.string('unit')
     }
 )
};
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
   export const down = function(knex) {
    return knex.schema.dropTable('undercategories')
};