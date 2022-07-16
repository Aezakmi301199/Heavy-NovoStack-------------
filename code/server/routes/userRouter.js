import Router from 'express'
import UserController from '../controllers/UserController.js';
import {body,validationResult} from 'express-validator';
import { checkUserBlock, comparePassword, findReasonBlock, findUserByEmail, findUserByLogin, findUserByPhone, validateEmail, validatePhone } from '../utils/functions.js';
import authMiddleWare from '../middleWare/authMiddleWare.js';
const userRouter = new Router();
userRouter.post('/registration',
body('password').isLength({min:3,max:40}),
body('age').custom( (age) => {
    if (isNaN(Number(age)) == true) {
      console.log("WFS")
      throw 'Invalid value'
    } else {return true}
}),
body('email').isEmail().custom(async (value) => {
    if (await findUserByEmail(value)) {
        throw 'emailInBase'
    } 
}),
body('login').notEmpty().custom(async (value) => {
    if (await findUserByLogin(value)) {
        throw 'loginInBase'
    } 
}),
body('repeatPassword').notEmpty(),
body('phone').isMobilePhone().custom(async (value) => {
       if( await findUserByPhone(value)) {
            throw 'phoneInBase'
        }
}),
UserController.createUser)
userRouter.get('/user/:login',UserController.findUserIDByLogin)
userRouter.put('/user',UserController.updateUser)
userRouter.delete('/user/:param',UserController.deleteUser)
userRouter.get('/activate/:link',UserController.activateMail)
userRouter.get('/refresh',UserController.updateRefreshToken)
userRouter.post('/login',UserController.loginUser)
userRouter.post('/logout',authMiddleWare,UserController.logoutUser)
userRouter.get('/profile',authMiddleWare,UserController.getOurProfile)
userRouter.put('/profile',
body('').custom(async(body) => {
    let {user} = body
    let errors = []
    console.log('lesha')
    for (let pool in user) {
        switch (pool) {
            case 'email':
                if (!validateEmail(user.email)){
                    errors = {
                        ...errors,
                        email: 'Некорректноая почта'
                    }
                } else if(await findUserByEmail(user.email)) {
                    errors = {
                        ...errors,
                        email: 'Почта занята'
                    }
                }
                break;
            case 'phone':
                if (isNaN(Number(user.phone)) == true || !validatePhone(user.phone)) {
                    errors = {
                        ...errors,
                        phone: 'Некорректное значение рос. номера'
                    }
                } else  if (await findUserByPhone(user.phone) ){
                        errors = {
                            ...errors,
                            phone: 'Номер телефона уже занят'
                        }
                }
                break;
                case 'oldPassword':
                    console.log('aps')
                    if (!await comparePassword(user.login,user.oldPassword)) {
                        errors = {
                            ...errors,
                            oldPassword: 'Неверный пароль'
                        }

                    } 
                    break;
                    case 'newPassword':
                        if (!user.oldPassword) {
                            errors = {
                                ...errors,
                                oldPassword: 'При смене пароля поле не может быть пустым'
                            }
                        } else if (user.newPassword != user.oldPassword) {
                            errors = {
                                ...errors,
                                newPassword: 'Пароли не совпадают'
                            }
                        }
                        break;
                        case 'age':
                            if (isNaN(Number(user.age)) == true) {
                                errors = {
                                    ...errors,
                                    age: 'Необходимо указать возраст числом'
                                }
                            } 
                            break;
            default:
                break
        }
    }
    console.log('nadya')
    if ((Object.keys(errors).length != 0)) {
        console.log(errors)
        throw errors
    }
})
,authMiddleWare,
UserController.updateOurProfile)
userRouter.get('/profile/:id',UserController.getProfileByID)
userRouter.get('/avatar',authMiddleWare,UserController.getAvatar)
userRouter.put('/profileAvatar',authMiddleWare,UserController.updateNewAvatar)
userRouter.get('/findUser',UserController.getUserByLogin)
userRouter.get('/allrole',UserController.getAllRole)
userRouter.get('/userrole/:id',UserController.getAllRoleByUser)
userRouter.get('/userCount',UserController.getCountUser)
userRouter.get('/statusUser/:id',UserController.getStatusUser)
userRouter.put('/updateRoleAndStatus',UserController.updateRoleAndStatus)
userRouter.put('/blockUser/:id',UserController.blockUser)


// ! РЕПОРТЫ 
userRouter.get('/reports',UserController.getAllReports)
userRouter.post('/reports',body('').custom(body => {
    console.log(body)
    console.log('izum')
    let errors = {}
    for (let i=0;i<Object.keys(body).length;i++) {
        switch (Object.keys(body)[i]) {
            case 'email':
                if (Object.values(body)[i] == '') {
                    errors = {...errors,email:'Не указана почта'}
                } else if (!validateEmail(Object.values(body)[i])) {
                    errors = {...errors,email:'Почта указана неверно'}
                }
                break;
            case 'reason':
                if ((Object.values(body)[i]  == '' || Object.values(body)[i] == 'other')  && body.message == '') {
                    errors = {...errors,reason:'Не указана причина жалобы'}
                }
                break;
            default:
                break
        }
    }
    console.log(errors)
    console.log('ОШИБКИ')
    if ((Object.keys(errors).length != 0)) {
        throw errors
    } else {
        return true
    }
}),UserController.createReport)
userRouter.get('/reportscompleted',UserController.getReportsCompleted)
userRouter.get('/reports/:id',UserController.getReportByID)
userRouter.get('/allCriteriesreports',UserController.findallCriteriesreports)
userRouter.put('/bearVerdict/:id',body('').custom(body => {
    console.log('checks')
    console.log(body)
    console.log(body.status)
    console.log(body.status === '')
    console.log()
    let errors = {}
    if(body.status === '') {
        errors = {
            ...errors,
            status:'Вердикт не вынесен'
        }
    } else if (body.status == false){
        if (body.reason === '' && body.comment_admin == '') {
            errors = {
                ...errors,
                reason:'Не указана причина блокировки'
            }
        } else if (body.reason.reason == 'other' && body.comment_admin == ''){
            errors = {
                ...errors,
                reason:'Не указана причина блокировки'
            }
        }
    }  else if (body.status == true) {
        if (body.comment_admin == ''){
            errors = {
                ...errors,
                status:'Не указана причина отказа'
            }
        }
    }
    console.log('lads')
    console.log(errors)
    console.log(Object.keys(errors).length != 0)
    console.log('ОШИБКИ')
    if ((Object.keys(errors).length != 0)) {
        throw errors
    } else {
        return true
    }

}),UserController.bearVerdict)



// userRouter.get('/users',UserController.getAllUser)
export default userRouter
/*
allrole
body('user.email').custom(async (value) => {
    if (value != undefined)  {
        if (await findUserByEmail(value)) {
            throw 'emailInBase'
        } 
    }
}),
body('user.phone').custom(async (value) => {
    if (value != undefined)  {
        value = Number(value)
        if (isNaN(value)){
          throw 'Invalid value'
        }
    }
})
 */