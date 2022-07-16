/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('reportreason').del()
  await knex('reportreason').insert([
    {type:'question', reason:'banAccount' , name:'Забыл логин' },
    {type:'question', reason:'forgetPassword' , name:'Забыл пароль' },
    {type:'question', reason:'banAccount' , name:'Аккаунт заблокировали'},
    {type:'appeal', reason:'spam' ,name:'Спам' },
    {type:'appeal',reason:'clonAccount', name:'Клонирование аккаунта'},
    {type:'appeal', reason:'clonAdvert',name:'Клонирование объявления'},
    {type:'appeal',reason:'provocativeContent', name:'Размещение провоцирующего контента'},
    {type:'appeal',reason:'placementAdvert', name:'Размещение рекламы'},
    {type:'appeal',reason:'offendUser', name:'Оскорбление пользователей'},
    {type:'appeal',reason:'placementPornography', name:'Оскорбление пользователей', name:'Пропаганда педофилии и распространение порнографии'},
    {type:'appeal',reason:'other', name:'Другое'},
  ]);
};

