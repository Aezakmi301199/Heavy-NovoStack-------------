/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('spares').del()
  await knex('spares').insert([
    {category:'Трактор',subcategory:'Двигатель',value:'Карбюраторный' },
    {category:'Трактор',subcategory:'Двигатель',value:'Газовый' },
    {category:'Трактор',subcategory:'Двигатель',value:'Дизельный' },

    {category:'Бульдозер',subcategory:'Тип ходовой',value:'Гусеничный'},
    {category:'Бульдозер',subcategory:'Тип ходовой',value:'Колёсный'},
    {category:'Бульдозер',subcategory:'Тип отвала',value:'поворотный'},
    {category:'Бульдозер',subcategory:'Тип отвала',value:'неповоротный'},
    {category:'Бульдозер',subcategory:'Тип отвала',value:'универсальный'},

    {category:'Кран',subcategory:'Грузозахватный орган',value:'Грузовой крюк'},
    {category:'Кран',subcategory:'Грузозахватный орган',value:'Грейфер'},
    {category:'Кран',subcategory:'Привод',value:'Одномоторный'},
    {category:'Кран',subcategory:'Привод',value:'Многомоторный'},
    {category:'Кран',subcategory:'Кабина управления',value:'Стационарная'},
    {category:'Кран',subcategory:'Кабина управления',value:'Нефиксированная'},
    {category:'Кран',subcategory:'Типы кранов',value:'Стреловой'},
    {category:'Кран',subcategory:'Типы кранов',value:'Кабельный'},
    {category:'Кран',subcategory:'Типы кранов',value:'Консольный'},
    {category:'Кран',subcategory:'Типы кранов',value:'Мостовой'},

    {category:'Бетономешалка',subcategory:'Тип смешивания',value:'Гравитационный'},
    {category:'Бетономешалка',subcategory:'Тип смешивания',value:'Редукторный'},
    {category:'Бетономешалка',subcategory:'Тип смешивания',value:'Венечный'},
    {category:'Бетономешалка',subcategory:'Расположение смесителя',value:'Сзади'},
    {category:'Бетономешалка',subcategory:'Расположение смесителя',value:'Спереди'},

    {category:'Самосвал',subcategory:'Способ разгрузки',value:'Задняя'},
    {category:'Самосвал',subcategory:'Способ разгрузки',value:'Боковая'},
    {category:'Самосвал',subcategory:'Способ разгрузки',value:'Двусторонняя'},
    {category:'Самосвал',subcategory:'Способ разгрузки',value:'Универсальная'},
    {category:'Самосвал',subcategory:'Способ выгрузки',value:'Наклонный'},
    {category:'Самосвал',subcategory:'Способ выгрузки',value:'Принудительный'},
    {category:'Самосвал',subcategory:'Тип кузова',value:'Бункер'},
    {category:'Самосвал',subcategory:'Тип кузова',value:'Платформа'},
    {category:'Самосвал',subcategory:'Тип кузова',value:'Движущаяся'},
    {category:'Самосвал',subcategory:'Тип наклона',value:'Гидравлический'},
    {category:'Самосвал',subcategory:'Тип наклона',value:'Винтовой'},
    {category:'Самосвал',subcategory:'Тип наклона',value:'Принудительный'},
    {category:'Самосвал',subcategory:'Коробка передач',value:'Автомат'},
    {category:'Самосвал',subcategory:'Коробка передач',value:'Механика'},

    {category:'Экскаватор',subcategory:'Тип ходовой',value:'Гусеничная'},
    {category:'Экскаватор',subcategory:'Тип ходовой',value:'Пневматическая'},
    {category:'Экскаватор',subcategory:'Тип ходовой',value:'Железнодорожная'},
    {category:'Экскаватор',subcategory:'Тип ходовой',value:'Понтонная'},
    {category:'Экскаватор',subcategory:'Тип ходовой',value:'Шагающая'},
    {category:'Экскаватор',subcategory:'Режим использования',value:'Постоянный'},
    {category:'Экскаватор',subcategory:'Режим использования',value:'Периодический'},
    {category:'Экскаватор',subcategory:'Тип мотора',value:'Дизельный'},
    {category:'Экскаватор',subcategory:'Тип мотора',value:'Электрический'},

    {category:'Автолестница',subcategory:'Тип привода лестницы',value:'Гидравлический'},
    {category:'Автолестница',subcategory:'Тип привода лестницы',value:'Комбинированный'},

    {category:'Бензовоз',subcategory:'Тип нефтепродуктов',value:'светлый'},
    {category:'Бензовоз',subcategory:'Тип нефтепродуктов',value:'темный'},

    {category:'Погрузчик',subcategory:'Источник питания',value:'ДВС'},
    {category:'Погрузчик',subcategory:'Источник питания',value:'Электродвигатель'},
    {category:'Погрузчик',subcategory:'Тип ходовой',value:'ДВС'},
    {category:'Погрузчик',subcategory:'Способ работы',value:'Циклический'},
    {category:'Погрузчик',subcategory:'Способ работы',value:'Непрерывный'},
    

    {category:'Автовоз',subcategory:'Способ крепления',value:'Ремень'},
    {category:'Автовоз',subcategory:'Способ крепления',value:'Откатник'},
  ]);
};

