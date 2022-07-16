/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('typereport').del()
  await knex('typereport').insert([
    {type:'question',name:'Вопрос' },
    {type:'appeal',name:'Жалоба' }
  ]);
};
