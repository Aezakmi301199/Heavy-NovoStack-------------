/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('userinfo').del()
  await knex('userinfo').insert([
    {user_id:1, email: 'user@gmail.com','confirmed':false},
    {user_id:2, email: 'moderator@gmail.com','confirmed':true},
    {user_id:3, email: 'admin@gmail.com','confirmed':true},
    {user_id:4, email: 'sads@gmail.com','confirmed':true},
    {user_id:5, email: 'sadsds@gmail.com','confirmed':true},
    {user_id:6, email: 'rubik@gmail.com','confirmed':true},
    {user_id:7, email: 'sand@gmail.com','confirmed':true},
    {user_id:8, email: 'logica@gmail.com','confirmed':true},
    {user_id:9, email: 'skfdgd@gmail.com','confirmed':true},
    {user_id:10, email: 'fdsgdcv@gmail.com','confirmed':true},
    {user_id:11, email: 'sdfsdg@gmail.com','confirmed':true},
    {user_id:12, email: 'fsdfsd@gmail.com','confirmed':true},
    {user_id:13, email: 'cxvxcv@gmail.com','confirmed':true},
    {user_id:14, email: 'dsfsd@gmail.com','confirmed':true},
  ]);
};
