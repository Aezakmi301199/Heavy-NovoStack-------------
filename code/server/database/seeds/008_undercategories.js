/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('undercategories').del()
  await knex('undercategories').insert([
    {category:'Трактор',subcategory:'Мощность двигателя',subcategorytype:'number',min:36,max:400,unit:'л.с.'},
    {category:'Трактор',subcategory:'Ширина',subcategorytype:'number',min:1500,max:5000,unit:'мм'},
    {category:'Трактор',subcategory:'Высота',subcategorytype:'number',min:1500,max:4000,unit:'мм'},
    {category:'Трактор',subcategory:'Тяговый класс',subcategorytype:'number',min:7,max:40,unit:'кН'},
    {category:'Трактор',subcategory:'Двигатель',subcategorytype:'string'},
    
    {category:'Бульдозер',subcategory:'Мощность двигателя',subcategorytype:'number',min:50,max:603,unit:'л.с.'},
    {category:'Бульдозер',subcategory:'Ширина',subcategorytype:'number',min:2000,max:5000,unit:'мм'},
    {category:'Бульдозер',subcategory:'Высота',subcategorytype:'number',min:2000,max:4000,unit:'мм'},
    {category:'Бульдозер',subcategory:'Длина отвала',subcategorytype:'number',min:2000,max:5500,unit:'мм'},
    {category:'Бульдозер',subcategory:'Масса отвала',subcategorytype:'number',min:5,max:32,unit:'т'},
    {category:'Бульдозер',subcategory:'Заглубление отвала',subcategorytype:'number',min:300,max:800,unit:'мм'},
    {category:'Бульдозер',subcategory:'Масса',subcategorytype:'number',min:5,max:155,unit:'т'},
    {category:'Бульдозер',subcategory:'Тип ходовой',subcategorytype:'string'},
    {category:'Бульдозер',subcategory:'Тип отвала',subcategorytype:'string'},

    {category:'Кран',subcategory:'Грузоподъемность',subcategorytype:'number',min:5,max:1500,unit:'т'},
    {category:'Кран',subcategory:'Грузозахватный орган',subcategorytype:'string'},
    {category:'Кран',subcategory:'Привод',subcategorytype:'string'},
    {category:'Кран',subcategory:'Кабина управления',subcategorytype:'string'},
    {category:'Кран',subcategory:'Типы кранов',subcategorytype:'string'},

    {category:'Бетономешалка',subcategory:'АБС объем',subcategorytype:'number',min:2,max:20,unit:'куб.м.'},
    {category:'Бетономешалка',subcategory:'Тип смешивания',subcategorytype:'string'},
    {category:'Бетономешалка',subcategory:'Расположение смесителя',subcategorytype:'string'},

    {category:'Самосвал',subcategory:'Мощность двигателя',subcategorytype:'number',min:150,max:700,unit:'л.с.'},
    {category:'Самосвал',subcategory:'Скорость',subcategorytype:'number',min:40,max:100,unit:'км/ч'},
    {category:'Самосвал',subcategory:'Способ разгрузки',subcategorytype:'string'},
    {category:'Самосвал',subcategory:'Способ выгрузки',subcategorytype:'string'},
    {category:'Самосвал',subcategory:'Тип кузова',subcategorytype:'string'},
    {category:'Самосвал',subcategory:'Тип наклона',subcategorytype:'string'},
    {category:'Самосвал',subcategory:'Коробка передач',subcategorytype:'string'},
   
    {category:'Экскаватор',subcategory:'Классификация',subcategorytype:'number',min:1,max:6,unit:'класс'},
    {category:'Экскаватор',subcategory:'Масса',subcategorytype:'number',min:6,max:71,unit:'т.'},
    {category:'Экскаватор',subcategory:'Тип ходовой',subcategorytype:'string'},
    {category:'Экскаватор',subcategory:'Режим использования',subcategorytype:'string'},
    {category:'Экскаватор',subcategory:'Тип мотора',subcategorytype:'string'},


    {category:'Грузовая машина',subcategory:'Длина',subcategorytype:'number',min:3,max:14,unit:'м'},
    {category:'Грузовая машина',subcategory:'Ширина',subcategorytype:'number',min:2,max:3,unit:'м'},
    {category:'Грузовая машина',subcategory:'Высота',subcategorytype:'number',min:2,max:3,unit:'м'},
    {category:'Грузовая машина',subcategory:'Объём',subcategorytype:'number',min:9,max:82,unit:'куб.м'},
    {category:'Грузовая машина',subcategory:'Грузоподъёмность',subcategorytype:'number',min:1,max:22,unit:'т'},


    {category:'Автолестница',subcategory:'Высота подъема',subcategorytype:'number',min:10,max:62,unit:'м'},
    {category:'Автолестница',subcategory:'Тип привода лестницы',subcategorytype:'string'},

    {category:'Бензовоз',subcategory:'Расход на 100км',subcategorytype:'number',min:25,max:40,unit:'л.'},
    {category:'Бензовоз',subcategory:'Макс.скорость',subcategorytype:'number',min:60,max:85,unit:'км/ч'},
    {category:'Бензовоз',subcategory:'Мощность двигателя',subcategorytype:'number',min:100,max:350,unit:'л.с.'},
    {category:'Бензовоз',subcategory:'Объём цистерны',subcategorytype:'number',min:4000,max:11000,unit:'л'},
    {category:'Бензовоз',subcategory:'Тип нефтепродуктов',subcategorytype:'string'},

    {category:'Погрузчик',subcategory:'Грузоподъемность',subcategorytype:'number',min:1,max:10,unit:'т.'},
    {category:'Погрузчик',subcategory:'Источник питания',subcategorytype:'string'},
    {category:'Погрузчик',subcategory:'Тип ходовой',subcategorytype:'string'},
    {category:'Погрузчик',subcategory:'Способ работы',subcategorytype:'string'},

    {category:'Автовоз',subcategory:'Вместимость машин',subcategorytype:'number',min:6,max:15,unit:'м'},
    {category:'Автовоз',subcategory:'Способ крепления',subcategorytype:'string'},
    
  ]);
};
