/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('pictureadvertisment').del()
  await knex('pictureadvertisment').insert([
    {advert_id:1,path:'/adverts/13/1/1.png'},
    {advert_id:1,path:'/adverts/13/1/2.png'},
    {advert_id:1,path:'/adverts/13/1/3.png'},
    {advert_id:1,path:'/adverts/13/1/4.png'},
    {advert_id:1,path:'/adverts/13/1/5.png'},
    {advert_id:1,path:'/adverts/13/1/6.png'},
    {advert_id:1,path:'/adverts/13/1/7.png'},
    {advert_id:1,path:'/adverts/13/1/8.png'},
    {advert_id:2,path:'/adverts/2/2/1.png'},
    {advert_id:2,path:'/adverts/2/2/2.png'},
    {advert_id:2,path:'/adverts/2/2/3.png'},
    {advert_id:2,path:'/adverts/2/2/4.png'},
    {advert_id:2,path:'/adverts/2/2/5.png'},
    {advert_id:2,path:'/adverts/2/2/6.png'},
    {advert_id:3,path:'/adverts/13/3/2.png'},
    {advert_id:4,path:'/adverts/5/4/d1.png'},
    {advert_id:4,path:'/adverts/5/4/d2.png'},
    {advert_id:4,path:'/adverts/5/4/d3.png'},
    {advert_id:4,path:'/adverts/5/4/d4.png'},
    {advert_id:4,path:'/adverts/5/4/d5.png'},
    {advert_id:4,path:'/adverts/5/4/d6.png'},
    {advert_id:5,path:'/adverts/5/5/ds1.png'},
    {advert_id:5,path:'/adverts/5/5/ds2.png'},
    {advert_id:5,path:'/adverts/5/5/ds3.png'},
  ]);
};
