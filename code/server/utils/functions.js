import {
  db
} from "../database/db.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
export const checkUserByID = async (id) => {
  return await db('userclient').select('id').where({
    id
  }).first()
}

export const checkUserBylogin = async (login) => {
  return await db('userclient').select('login').where({
    login
  }).first()
}
export const checkUserBlock = async (login) => {
  return await db('userclient').select('status').where({
    login
  }).first()
}

export const findReasonBlock = async (login) => {
  return await db('report').select({    
  reason:'reportreason.name',
  comment_admin:'report.comment_admin'})
  .where({'report.intruder_login':login})
  .leftJoin('reportreason',{'report.reason':'reportreason.reason'}).first()
}

export const findUserByEmail = async (email) => {
  return await db('userinfo').select('email').where({
    email
  }).first()
}
export const findLoginByID = async (id) => {
  return await db('userclient').select('login').where({
    id
  }).first()
}
export const findUserByPhone = async (phone) => {
  return await db('userinfo').select('phone').where({
    phone
  }).first()
}

export const getNowTimeAndDate = () => {
  let ifYourDayWasALastDay = new Date();
  ifYourDayWasALastDay.setHours(0, 0, 0, 0);
  return ifYourDayWasALastDay
}
export const getAllLoginsAndID = async () => {
  return await dbGame('userclient').select('login', 'id')
}
export const findUserByLogin = async (login) => {
  //return await dbGame('users').select('id','login').where({login}).first()
  return await db('userclient')
    .select({
      id: 'userclient.id',
      login: 'userclient.login',
    })
    .where({
      login
    }).first()
}

export const findHashPassByLogin = async (login) => {
  return await db('userclient').select('password').where({
    login
  }).first()
}
export const comparePassword = async (login,checkPassword) => {
  const {password} = await db('userclient').select('password').where({
    login
  }).first()
return bcrypt.compareSync(password,checkPassword) 
}
export const getPages = (count, limit) => {
  if (Math.ceil(count / limit) != 0) {
    return (Math.ceil(count / limit) - 1)
  } else {
    return Math.ceil(count / limit)
  }
}
export const findCategory = async (category) => {
  const check = await db('category').where({
    category: category.toString()
  }).select('category').first()
  return check ? false : true;
}
export const findBrand = async (brand) => {
  const check = await db('brand').where({
    brand: brand.toString()
  }).select('brand').first()
  return check ? false : true;
}


export const findSpareCheck =  async(category,subcategory,value) => {
  return await db('spares').select('*').where(function () {
      this
        .where('spares.category','=', category)
        .andWhere('spares.subcategory', '=', subcategory)
        .andWhere('spares.value', '=', value)
    })
}

export const  validatePhone = (phone) =>{
  let regex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return regex.test(phone);
 }

 export  const  validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}