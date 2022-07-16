/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('advertismentdopsettings').del()
  await knex('advertismentdopsettings').insert([
    {advert_id:1, subcategory:'Мощность двигателя',value:100},
    {advert_id:1, subcategory:'Ширина',value:2000},
    {advert_id:1, subcategory:'Высота',value:2000},
    {advert_id:1, subcategory:'Тяговый класс',value:9},
    {advert_id:1, subcategory:'Двигатель',value:'Дизельный'},

    {advert_id:2, subcategory:'Мощность двигателя',value:310},
    {advert_id:2, subcategory:'Ширина',value:2750},
    {advert_id:2, subcategory:'Высота',value:3320},
    {advert_id:2, subcategory:'Тяговый класс',value:9},
    {advert_id:2, subcategory:'Двигатель',value:'Дизельный'},

    {advert_id:3, subcategory:'Мощность двигателя',value:51},
    {advert_id:3, subcategory:'Ширина',value:2000},
    {advert_id:3, subcategory:'Высота',value:2200},
    {advert_id:3, subcategory:'Тяговый класс',value:7},
    {advert_id:3, subcategory:'Двигатель',value:'Дизельный'},


    {advert_id:4, subcategory:'Мощность двигателя',value:207},
    {advert_id:4, subcategory:'Ширина',value:3100},
    {advert_id:4, subcategory:'Высота',value:3500},
    {advert_id:4, subcategory:'Длина отвала',value:2500},
    {advert_id:4, subcategory:'Масса отвала',value:10},
    {advert_id:4, subcategory:'Заглубление отвала',value:400},
    {advert_id:4, subcategory:'Масса',value:15},
    {advert_id:4, subcategory:'Тип ходовой',value:'Гусеничный'},
    {advert_id:4, subcategory:'Тип отвала',value:'поворотный'},

    {advert_id:5, subcategory:'Мощность двигателя',value:251},
    {advert_id:5, subcategory:'Ширина',value:3262},
    {advert_id:5, subcategory:'Высота',value:3500},
    {advert_id:5, subcategory:'Длина отвала',value:2500},
    {advert_id:5, subcategory:'Масса отвала',value:10},
    {advert_id:5, subcategory:'Заглубление отвала',value:400},
    {advert_id:5, subcategory:'Масса',value:25},
    {advert_id:5, subcategory:'Тип ходовой',value:'Гусеничный'},
    {advert_id:5, subcategory:'Тип отвала',value:'универсальный'},

  ]);
};
