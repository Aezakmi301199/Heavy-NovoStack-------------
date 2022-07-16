/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('report').del()
  await knex('report').insert([
    {user_id:2,comment_admin:'',reason:'clonAdvert',email:'vsemayki@gmail.com', intruder_login:'user',type:'appeal',status:'Проверяется', message:'Проблемы с доступом к JoyCasino? Реклама в объявлении у пользователя user Ссылка на аккаунт http://localhost:3000/profile/1' },
  ]);
};
