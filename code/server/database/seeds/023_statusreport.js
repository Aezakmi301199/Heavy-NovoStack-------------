/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export const seed = async function(knex) {
  await knex('statusreport').del()
  await knex('statusreport').insert([
  {status:'pending',name:'Проверяется'},
  {status:'fulfilled',name:'Выполнена'},
  {status:'rejected',name:'Отклонена'},
  ]);
};
/*
 .select({
        id:'report.id',
        user_id:'report.id',
        intruder_login:'report.id',
        reason:'report.id',
        email:'report.id',
        message:'report.id',
        type:'report.id',
        status:'report.id',
      })
*/