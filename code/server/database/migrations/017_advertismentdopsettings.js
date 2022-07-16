/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const up = function(knex) {
  return knex.schema.createTable('advertismentdopsettings', 
    function (table) {
        table.increments('id');
        table.integer('advert_id').references('id').inTable('advertisment');
        table.string('subcategory').notNullable();
        table.string('value');
      }
  )
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export const down = function(knex) {
    return knex.schema.dropTable('advertismentdopsettings')
};

