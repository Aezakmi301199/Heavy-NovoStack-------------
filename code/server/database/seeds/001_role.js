/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  await knex('role').del()
  await knex('role').insert([
    {role: 'user'},
    {role: 'usersuper'},
    {role: 'moderator'},
    {role: 'admin'}
  ]);
};
