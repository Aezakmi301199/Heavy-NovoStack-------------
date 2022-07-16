/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('userrole').del()
  await knex('userrole').insert([
    {user_id:2, role_id: 4},
    {user_id:3, role_id: 3}
  ]);
};
