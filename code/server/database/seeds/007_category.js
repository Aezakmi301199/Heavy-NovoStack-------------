/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('category').del()
  await knex('category').insert([
    {category:'Кран',path_icon:'/categoryAvatars/1/1.png'},
    {category:'Бульдозер',path_icon:'/categoryAvatars/2/2.png'},
    {category:'Трактор',path_icon:'/categoryAvatars/3/3.png'},
    {category:'Бетономешалка',path_icon:'/categoryAvatars/4/4.png'},
    {category:'Самосвал',path_icon:'/categoryAvatars/5/5.png'},
    {category:'Экскаватор',path_icon:'/categoryAvatars/6/6.png'},
    {category:'Грузовая машина',path_icon:'/categoryAvatars/7/7.png'},
    {category:'Автолестница',path_icon:'/categoryAvatars/8/8.png'},
    {category:'Бензовоз',path_icon:'/categoryAvatars/9/9.png'},
    {category:'Погрузчик',path_icon:'/categoryAvatars/10/10.png'},
    {category:'Автовоз',path_icon:'/categoryAvatars/11/11.png'},
  ]);
};

