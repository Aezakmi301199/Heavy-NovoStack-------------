import { db } from "../database/db.js"
import bcrypt from 'bcryptjs';
import TokenService from "./TokenService.js";
import { v1 as uuidv1 } from 'uuid';
import { checkUserBlock, checkUserByID, checkUserBylogin, findHashPassByLogin, findReasonBlock, findUserByLogin, getAllLoginsAndID, getNowTimeAndDate } from "../utils/functions.js";
import ApiError from "../exceptions/ApiError.js";
import MailService from "./MailService.js";
import { api_url } from "../config.js";
import * as fs from 'fs';

class UserService {
    async create(login,password,email,phone,age,gender,first_name,last_name,rolesFromFront = []) {
        const hashPassword = bcrypt.hashSync(password,3)
        const activelink = uuidv1();
        const [{id}]=  await db('userclient').insert({
            login,
            password:hashPassword
        }).returning('id')
        let userInfo = {
            user_id:id,
            ...email ? {email: email} : {},
            ...phone ? {phone: phone} : {},
            ...age ? {age: age} : {},
            ...gender ? {gender: gender} : {},
            ...first_name ? {first_name: first_name} : {},
            ...last_name ? {last_name: last_name} : {}
        }
        console.log(' IAM DA')
        console.log(rolesFromFront)
        if (rolesFromFront.length > 0) {
            let rolesFromFrontConvert = []
            for (let i=0;i< rolesFromFront.length;i++){
                rolesFromFrontConvert = [...rolesFromFrontConvert,{  user_id:id,role_id:rolesFromFront[i]}]
            }
            console.log('shifu')
            console.log(rolesFromFrontConvert)
           await db('userrole').insert(rolesFromFrontConvert)
        }
        console.log(rolesFromFront)
       await db('userinfo').insert(userInfo) 
       await db('usersocialnetworkandpath').update({activelink}).where({user_id:id})
      // await MailService.activateMail(email,`${api_url}/activate/${activelink}`)
       const roles = await db('roles').select('role','user_id').where({user_id:id})
       const tokens = await TokenService.generateTokens(id,login,roles)
       await TokenService.saveRefreshToken(id,tokens.refreshToken)
       return {tokens,user:{id,login,roles}}; 
    }

    async delete (idorlogin) {
        if (Number(idorlogin)){
            var checkByID = await checkUserByID(idorlogin)
        } else {
            var checkByLogin = await checkUserBylogin(idorlogin)
        }
        if (checkByID === undefined && checkByLogin === undefined) {
            throw ApiError.BadRequest('Пользователя не существует с таким ID/LOGINOM')
        }
        if (checkByID) {
            await db('userclient').where({id:idorlogin}).update({status:false})
        } else {await db('userclient').where({login:idorlogin}).update({status:false})}
        return 'Пользователь успешно удален'
    }

    async find (login) {
      const id = await db('userclient').select('id').where({login}).first();
        if (id === undefined){
            throw ApiError.BadRequest('Пользователь с таким логином не найден')
        }
      return id
    }

    async update (updateUser,id) {

        const {email,newPassword,country,city,first_name,last_name,age,gender,phone,vk,youtube,telegram} = updateUser;
        if (newPassword) {
            newPassword = bcrypt.hashSync(password,3)
        }
        let time =  getNowTimeAndDate();
        let userinfo = {
            user_id:id,
            ...email ? {email} : {},
            ...newPassword ? {password:newPassword} : {},
            ...country ? {country} : {},
            ...city ? {city} : {},
            ...first_name ? {first_name} : {},
            ...last_name ? {last_name} : {},
            ...age ? {age} : {},
            ...gender ? {gender} : {},
            ...phone ? {phone} : {},
            updated_at:getNowTimeAndDate()
        }
        let usersocialnetworkandpath = {
            user_id:id,
            ...vk ? {vk} : {},
            ...youtube ? {youtube} : {},
            ...telegram ? {telegram} : {},
        }
        await db('userinfo').where({user_id:id}).update(userinfo)
        await db('usersocialnetworkandpath').where({user_id:id}).update(usersocialnetworkandpath)
        return Date.now()
      }
  
      async login (user) {
        const {login,password} = user;
         user =  await findUserByLogin(login) // OBJECT { ID,LOGIN}
        if (user === undefined){
            throw ApiError.BadRequest('Неверный логин',[{param:'login',msg:'uncorrect'}]);
        }
        const {password:hashPassword} = await findHashPassByLogin(login)
        const passwordCheck = bcrypt.compareSync(password,hashPassword) 
        if (!passwordCheck) {
            throw  ApiError.BadRequest('Неверный пароль',[{param:'password',msg:'uncorrect'}]);
        }
        let response =  await checkUserBlock(login)
        let  errors = response.status == false  ? [{param:'block',block:await findReasonBlock(login)}]  : []

        console.log('zbs')
        console.log(errors)
        console.log('jd')
        if (errors.length>0) {
            throw ApiError.BadRequest('Заблокированный польз-ль пытается войти',  errors)
        } 
        const roles = await db('roles').select('role','user_id').where({user_id:user.id})
        const tokens = await TokenService.generateTokens(user.id, user.login,roles)
        await TokenService.saveRefreshToken(user.id,tokens.refreshToken);
        return { tokens,user:{id:user.id, login:user.login, roles }}
    }

    async logout (cookie) {
        const {refreshToken} = cookie;
        await TokenService.deleteRefreshToken(refreshToken)
    }
    async getAvatar (user) {
        return await db('usersocialnetworkandpath')
        .select({avatar:'path'})
        .where({user_id:user.id})
        .first() 
    }
    async getProfile(user) { 
        if (user.login === undefined) {
          var {login} = await db('userclient').select('login').where({id:user.id}).first()
        } else { var login = user.login}
        console.log('LADOGA')
        console.log(user.id)
        console.log('norma')
        const userinfo = await db('userinfo').select({
            phone:'phone',
            email:'email',
            age:'age',
            gender:'gender',
            first_name:'first_name',
            last_name:'last_name',
            country:'country',
            city:'city',
            create_at:'create_at',
            confirmed:'confirmed'
        }).where({user_id:user.id}).first()
        console.log(userinfo)
        const usersocialnetworkandpath = await db('usersocialnetworkandpath')
        .select({vk:'vk',youtube:'youtube',telegram:'telegram',avatar:'path'})
        .where({user_id:user.id})
        .first() 
        return {
            login,userinfo,usersocialnetworkandpath
        }
     }    
    
     async updateNewAvatar (user,picture) {
        const pathToDirImage = `${process.cwd()}/stor/avatars`;
        const pathToDirUser = `${pathToDirImage}/${user.id}`;
        console.log('Norm1.0')
        const pathPicture = `${pathToDirUser}/${picture.name}`;
        fs.stat(pathToDirUser, function(err, stats) {
            if (err) {
                console.log('Norm2.0')
                fs.mkdir(`${pathToDirUser}`,(err)=>{
                    console.log('pzdc')
                    if (err){
                        console.log('Norm3.0')
                        console.log(err) 
                    } else {
                        picture.mv(`stor/avatars/${user.id}/${picture.name}`, function(err){
                            if (err){

                                console.log(err)
                            } 
                    })
                    }
                })
            } else {
                console.log('нет папки')
                picture.mv(`stor/avatars/${user.id}/${picture.name}`, function(err){
                    if (err){
                        console.log(err)
                    } 
            })
        }})

        const pathToPictureUser = `/avatars/${user.id}/${picture.name}`;
        await db('usersocialnetworkandpath').update({path:pathToPictureUser}).where({user_id:user.id})
        return pathToPictureUser;
    }

    async getUserByLogin (login) {
        const logins = await db('userclient').select('login','id');
        const searchLogins = logins.filter(user=> user.login.includes(login))
        if (searchLogins.length === logins.length) {return []} else {return searchLogins}
    }

    async getAllRole () {
        return await db('role').select('*');
    }

    async getCountUser () {
        let msU = await db('userclient').select('id');
        return msU.length;
    }

    async getAllRoleByUser (id) {
        return await db('userrole')
        .select({
            id:'userrole.role_id',
            role:'role.role'
        })
        .where({user_id:id})
        .leftJoin('role',{'userrole.role_id' : 'role.id'})
    }

    async getStatusUser (id) {
        return await db('userclient').select('status').where({id:id}).first()
    }
    async updateRoleAndStatus (id,roles,status) {
         await db('userclient').update({status:status}).where({id:id})
         roles = roles.map(objectRole => objectRole.id)
         let rolesFromDB = await db('userrole').select('role_id').where({user_id:id})
         rolesFromDB =rolesFromDB.filter(role => role.role_id != 1).map(roleObject => roleObject.role_id)
         let newRoles = roles.filter(roleID => rolesFromDB.findIndex(roleIDFromDB=> roleIDFromDB == roleID) === -1  )
         let deletedRoles = rolesFromDB.filter(roleFromDBID => roles.findIndex(roleID => roleID == roleFromDBID ) === -1)
    
         if (newRoles.length>0){
            newRoles = newRoles.map(role => { return {
                user_id:id,
                role_id:role
            }}) 
            console.log('new')
            console.log(newRoles)
            await db('userrole').insert([...newRoles])
        }
        if (deletedRoles.length>0){
            deletedRoles = deletedRoles.map(role => { return [id,role]})
            console.log('old')
            console.log(deletedRoles)
            await db('userrole').del().whereIn(['user_id','role_id'],[...deletedRoles])
        }


    }
    async blockUser (id) {
        console.log('fs')
        console.log(id)
         const roles =  await db('userrole').select('role_id').where({user_id:id})
         console.log(roles)
         if (roles.findIndex(role => role.role_id == 4) != -1 ) {
            throw ApiError.BadRequest('Админа нельзя блокировать')
         }
         console.log(roles)
        await db('userclient').update({status:false}).where({id:id})
    }

    async getAllReports () {
      return await db('report')
      .select({
        id:'report.id',
        user_id:'report.user_id',
        intruder_login:'report.intruder_login',
        intruder_ID:'userclient.id',
        reason:'report.reason',
        email:'report.email',
        message:'report.message',
        type:'report.type',
        status:'report.status',
        reasonName:'reportreason.name',
        comment_admin:'report.comment_admin'
      })
      .leftJoin('reportreason',{'report.reason' : 'reportreason.reason'})
      .leftJoin('userclient',{'report.intruder_login' : 'userclient.login'})
      .where({'report.status':'Проверяется'})
    }
    async getReportByID (id) {
        const report = await db('report')
        .select({
          id:'report.id',
          user_id:'report.user_id',
          intruder_login:'report.intruder_login',
          intruder_ID:'userclient.id',
          reason:'report.reason',
          email:'report.email',
          message:'report.message',
          type:'report.type',
          status:'report.status',
          reasonName:'reportreason.name',
          statusName:'statusreport.name',
          comment_admin:'report.comment_admin'
        })
        .leftJoin('reportreason',{'report.reason' : 'reportreason.reason'})
        .leftJoin('statusreport',{'report.status' : 'statusreport.status'})
        .leftJoin('userclient',{'report.intruder_login' : 'userclient.login'})
        .where({'report.id':id})
        .first()

        if (report == undefined) {
            throw ApiError.underfinedRes('Страницы не существует')
        } else {
            console.log(report)
            return report}

      }

      async findallCriteriesreports () {
       return await db('reportreason').select('*').where({type:'appeal'})
      }
      async bearVerdict (reportID,verdict) {
        console.log('ser')
        console.log(reportID) 
        console.log(verdict)
        if (verdict.status == true) {
            await db('report').update({status:verdict.statusName,comment_admin:verdict.comment_admin}).where({id:reportID})
            
        } else if (verdict.reason.reason != 'other' && verdict.status == false){
            await db('userclient').update({status:false}).where({id:verdict.intruder_ID})
            await db('report').update({status:verdict.statusName,reason:verdict.reason.reason,comment_admin:verdict.comment_admin}).where({id:reportID})
            await db('usersocialnetworkandpath').update({refreshtoken:''}).where({user_id:verdict.intruder_ID})
            
        } else if (verdict.status == false) {
            await db('userclient').update({status:false}).where({id:verdict.intruder_ID})
            await db('usersocialnetworkandpath').update({refreshtoken:''}).where({user_id:verdict.intruder_ID})
            await db('report').update({status:verdict.statusName,reason:verdict.reason.reason,comment_admin:verdict.comment_admin}).where({id:reportID})
        }

       }
       async getReportsCompleted () {
        let id = await db('report').select('id').where({status:'Одобрена'})
        return id.length;
       }
       async createReport (report) {
        let id = await db('report').insert(report)
        return id.length;
       }
}


//reportreason
export default new UserService()

