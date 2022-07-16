import { nextTick } from "process";
import { api_client } from "../config.js";
import bcrypt from 'bcryptjs';
import MailService from "../services/MailService.js";
import TokenService from "../services/TokenService.js";
import UserService from "../services/UserService.js";
import {body,validationResult} from 'express-validator';
import ApiError from "../exceptions/ApiError.js";
import { findHashPassByLogin } from "../utils/functions.js";
class UserController {

    async createUser (req,res,next) {
        try {
            let validationCheck = validationResult(req);
            console.log('lesha')
            console.log(req.body)
            console.log(validationCheck)
            console.log('wd')
            const {password:firstPass,repeatPassword} = req.body;
            if (firstPass != repeatPassword ){
                validationCheck.errors.push({param:'repeatPassword'})
            }
            let errors= validationCheck.errors.length ;
            if (errors) {
                            throw ApiError.BadRequest('Введены некорректные данные',validationCheck.errors)
            } 
            const {login,password,email,phone,age,gender,first_name,last_name} = req.body.user
            let roles = req.body.user?.roles ? req.body.user.roles : []
            console.log('ROLI')
            console.log(roles)
            const response = await UserService.create(login,password,email,phone,age,gender,first_name,last_name,roles)  
            
            
            console.log('otvet')
            console.log(response)
            console.log('vot eto da')
         //   response = {tokens,user:{id,login,roles}}; 
            res.cookie('refreshtoken',response.tokens.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json()
        } catch (e) {
            next(e)
        }
    }
 

    async deleteUser (req,res,next){
        try {
            const response = await UserService.delete(req.params.param)
            
            res.json(response)
        } catch(e){
            next(e)
        }
    }

    async findUserIDByLogin (req,res,next){
        try {
            const id = await UserService.find(req.params.login)
            res.json(id)
        } catch(e){
            next(e)
        }
    }

    async updateUser (req,res,next){
        try {
            const id = await UserService.update(req.body)
            res.json(id)
        } catch(e){
            next(e)
        }
    }

    async activateMail (req,res,next) {
        try {
            const link = req.params.link;
            await MailService.activate(link);
            return res.redirect(api_client);
        } catch (e) {
            next(e)
        }
    }

    async updateRefreshToken (req,res,next) {
        try {
           const user = await TokenService.refresh(req.cookies)
            res.cookie('refreshToken', user.tokens.refreshToken)
            res.status(200).json(user)
        } catch(e) {
            next(e)
        }
    }

    async loginUser (req,res,next) {
        try {
            const user = await UserService.login(req.body)
            res.clearCookie('refreshToken');
            res.cookie('refreshToken',user.tokens.refreshToken,{maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async logoutUser (req,res,next) {
        try {
            await UserService.logout(req.cookies);
            res.clearCookie('refreshToken');
            res.status(200).json();
        } catch (e) {
            next(e)
        }
    }

    async getOurProfile (req,res,next) {
        try {
            const userInfo= await UserService.getProfile(req.user)
            res.json(userInfo)
        } catch(e) {
            next(e)
        }
    }
    async getProfileByID (req,res,next) {
        try {
            const id = req.params.id
            let user = {id}            
            const userInfo= await UserService.getProfile(user)
            res.json(userInfo)
        } catch(e) {
            next(e)
        }
    }
    async updateNewAvatar (req,res,next) {
        try {
            const pathToPictureUser = await UserService.updateNewAvatar(req.user,req.files.avatar)
            res.json(pathToPictureUser)
        } catch(e) {
            next(e)
        }
    }
    async getAvatar (req,res,next) {
        try {
            const userObj = await UserService.getAvatar(req.user)
            res.json(userObj)
        } catch(e) {
            next(e)
        }
    }
    async getUserByLogin (req,res,next) {
        try {
            const pathToPictureUser = await UserService.getUserByLogin(req.query.login)
            res.json(pathToPictureUser)
        } catch(e) {
            next(e)
        }
    }
    async updateOurProfile (req,res,next) {
        try {
          
            let validationCheck = validationResult(req);
            console.log(validationCheck)
            let errors= validationCheck.errors.length ;
            if (errors) {
                throw ApiError.BadRequest('Введены некорректные данные', validationCheck.errors[0].msg)
            } 
            
            const response = await UserService.update(req.body.user,req.user.id)
             res.json(response)
        } catch(e) {
            next(e)
        }
    }
    async getAllRole (req,res,next) {
        try {
            const roles = await UserService.getAllRole()
             res.json(roles)
        } catch(e) {
            next(e)
        }
    }
    async getAllRoleByUser (req,res,next) {
        try {
            console.log(req.params.id)
            console.log('check')
            const roles = await UserService.getAllRoleByUser(req.params.id)
            console.log('roley')
            console.log(roles)
             res.json(roles)
        } catch(e) {
            next(e)
        }
    }
    async getCountUser (req,res,next) {
        try {
            const countUser = await UserService.getCountUser()
             res.json(countUser)
        } catch(e) {
            next(e)
        }
    }
    async getStatusUser (req,res,next) {
        try {
            const statusUser = await UserService.getStatusUser(req.params.id)
             res.json(statusUser)
        } catch(e) {
            next(e)
        }
    }
    async updateRoleAndStatus (req,res,next) {
        try {
            const {id,roles,status} = req.body
            const response = await UserService.updateRoleAndStatus(id,roles,status)
             res.json()
        } catch(e) {
            next(e)
        }
    }
    async blockUser (req,res,next) {
        try {
            const response = await UserService.blockUser(req.params.id)
             res.json()
        } catch(e) {
            next(e)
        }
    }
    // ! РЕПОРТЫ __________________________________________________________________________

    async getAllReports (req,res,next) {
        try {
            const reports = await UserService.getAllReports()
             res.json(reports)
        } catch(e) {
            next(e)
        }
    }
    async getReportByID (req,res,next) {
        try {
            const report = await UserService.getReportByID(req.params.id)
             res.json(report)
        } catch(e) {
            next(e)
        }
    }
    async findallCriteriesreports (req,res,next) {
        try {
            const reportCriteries = await UserService.findallCriteriesreports()
             res.json(reportCriteries)
        } catch(e) {
            next(e)
        }
    }
    async bearVerdict (req,res,next) {
        try {
            let validationCheck = validationResult(req);
            let errors= validationCheck.errors.length ;
            console.log(validationCheck.errors)
            console.log(errors)
            if (errors) {
                throw ApiError.BadRequest('Данные вердикта не корректны', validationCheck.errors[0].msg)
            } 
            const reportCriteries = await UserService.bearVerdict(req.params.id,req.body)
             res.json()
        } catch(e) {
            next(e)
        }
    }

    async getReportsCompleted (req,res,next) {
        try {
            const complreports = await UserService.getReportsCompleted()
             res.json(complreports)
        } catch(e) {
            next(e)
        }
    }
    async createReport (req,res,next) {
            try {
            let validationCheck = validationResult(req);
            let errors= validationCheck.errors.length ;
            console.log(validationCheck.errors)
            console.log(errors)
            if (errors) {
                throw ApiError.BadRequest('Неправильно составлен репорт поль-ем', validationCheck.errors[0].msg)
            } 
                const report = await UserService.createReport({...req.body,type:'appeal',status:'Проверяется'})
                res.json()
            } catch(e) {
                next(e)
            }
    }
}


export default new UserController();