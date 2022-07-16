import bcrypt from 'bcryptjs';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  let examples = [{login: 'user',password:'user'},
  {login: 'admin',password:'admin'},
  {login: 'moderator',password:'moderator'},

  {login: 'milka',password:'moderator'},

  {login: 'BruceWayne',password:'moderator'},

  {login: 'Terminator',password:'moderator'},

  {login: 'Genezis',password:'moderator'},

  {login: 'Nemezida',password:'moderator'},

  {login: 'SunnyBoy',password:'moderator'},

  {login: 'Mark',password:'moderator'},

  {login: 'Gela',password:'moderator'},

  {login: 'Aero',password:'moderator'},

  {login: 'classGolg',password:'moderator'},
  
  {login: 'danceBro2289',password:'moderator'}]
  let examplesHash = []
  for (let i =0;i<examples.length;i++){
    const hashPassword = bcrypt.hashSync(examples[i].password,3)
    examplesHash = [...examplesHash,{...examples[i], password:hashPassword}]
  }

  await knex('userclient').del()
  await knex('userclient').insert(examplesHash);
};
