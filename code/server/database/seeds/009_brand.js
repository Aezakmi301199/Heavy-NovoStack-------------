/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('brand').del()
  await knex('brand').insert([
    {category:'Трактор',brand:'Fendt' },
    {category:'Трактор',brand:'John Deere' },
    {category:'Трактор',brand:'CNH (New Holland)'},
    {category:'Трактор',brand:'JCB'},
    {category:'Трактор',brand:'Same Deutz-Fahr'},
    {category:'Трактор',brand:'Case' },
    {category:'Трактор',brand:'Zoomlion' },
    {category:'Трактор',brand:'ЧТЗ' },
    {category:'Трактор',brand:'New Holland' },
    {category:'Трактор',brand:'МТЗ' },
    
    {category:'Бульдозер',brand:'Caterpillar' },
    {category:'Бульдозер',brand:'Komatsu' },
    {category:'Бульдозер',brand:'ДСТ-Урал'},
    {category:'Бульдозер',brand:'ЧТЗ'},
    {category:'Бульдозер',brand:'Shehwa'},
    {category:'Бульдозер',brand:'Четра'},
    {category:'Бульдозер',brand:'Кировец'},
    {category:'Бульдозер',brand:'Белаз'},
    {category:'Бульдозер',brand:'МоАЗ'},

    {category:'Кран',brand:'Азовмаш'},
    {category:'Кран',brand:'Faun'},
    {category:'Кран',brand:'Liebherr'},
    {category:'Кран',brand:'Konecranes'},
    {category:'Кран',brand:'Cargotec'},
    {category:'Кран',brand:'XCMG'},
    {category:'Кран',brand:'ZPMC'},
    {category:'Кран',brand:'Manitowoc'},

    {category:'Бетономешалка',brand:'МАЗ'},
    {category:'Бетономешалка',brand:'БелАЗ'},
    {category:'Бетономешалка',brand:'МЗКТ'},
    {category:'Бетономешалка',brand:'КрАЗ'},
    {category:'Бетономешалка',brand:'Volvo'},
    {category:'Бетономешалка',brand:'Scania'},
    {category:'Бетономешалка',brand:'Iveco'},
    {category:'Бетономешалка',brand:'Ford'},
    {category:'Бетономешалка',brand:'Nissan'},

    {category:'Самосвал',brand:'Caterpillar'},
    {category:'Самосвал',brand:'БелАЗ'},
    {category:'Самосвал',brand:'Terex'},
    {category:'Самосвал',brand:'Liebherr'},
    {category:'Самосвал',brand:'Komatsu'},
    {category:'Самосвал',brand:'Kress'},
    {category:'Самосвал',brand:'Тонар'},


    {category:'Экскаватор',brand:'Volvo'},
    {category:'Экскаватор',brand:'JCB'},
    {category:'Экскаватор',brand:'Caterpillar'},
    {category:'Экскаватор',brand:'Komatsu'},
    {category:'Экскаватор',brand:'XCMG'},
    {category:'Экскаватор',brand:'Hyundai'},
    {category:'Экскаватор',brand:'Hitachi'},

    {category:'Грузовая машина',brand:'Ford'},
    {category:'Грузовая машина',brand:'Белаз'},
    {category:'Грузовая машина',brand:'Краз'},
    {category:'Грузовая машина',brand:'Уаз'},
    {category:'Грузовая машина',brand:'Daf'},
    {category:'Грузовая машина',brand:'Faw'},
    {category:'Грузовая машина',brand:'Foton'},


    {category:'Автолестница',brand:'Пожарная'},


    {category:'Бензовоз',brand:'Hyundai'},
    {category:'Бензовоз',brand:'Faw'},
    {category:'Бензовоз',brand:'Ford'},
    {category:'Бензовоз',brand:'Kia'},
    {category:'Бензовоз',brand:'Scania'},
    {category:'Бензовоз',brand:'Iveco-AMT'},
    {category:'Бензовоз',brand:'AMS'},
    {category:'Бензовоз',brand:'ЧМЗ'},

    {category:'Погрузчик',brand:'Atlas'},
    {category:'Погрузчик',brand:'Bobcat'},
    {category:'Погрузчик',brand:'Case'},
    {category:'Погрузчик',brand:'Caterpillar'},
    {category:'Погрузчик',brand:'Changlin'},
    {category:'Погрузчик',brand:'Doosan'},
    {category:'Погрузчик',brand:'Dressta'},
    {category:'Погрузчик',brand:'Foton'},

    {category:'Автовоз',brand:'Lohr'},
    {category:'Автовоз',brand:'Rolfo'},
    {category:'Автовоз',brand:'Kassbohrer'},
    {category:'Автовоз',brand:'Cimc'},
    {category:'Автовоз',brand:'Atlant'},

  ]);
};


