/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('supportquestion').del()
  await knex('supportquestion').insert([
    {question:'Что из себя представляет NovoStack?', answer:'Это платформа продавцов и покупателей, для прямых  переговоров,без посредников. Смысл в том, что в NovoStack  поиск спец. техники проводится по конкретным фильтрам, которых обычно нет на площадках с большим ассортиментом недвижимости или услуг.'},
  ]);
};

