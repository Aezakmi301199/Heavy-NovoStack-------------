import Router from 'express'
import {
    body
} from 'express-validator';
import {
    findBrand,
    findCategory,
    findSpareCheck,
    findUserByEmail,
    findUserByLogin,
    findUserByPhone
} from '../utils/functions.js';
import authMiddleWare from '../middleWare/authMiddleWare.js';
import AdvertismentController from '../controllers/AdvertismentController.js';
import roleMiddleWare from '../middleWare/roleMiddleWare.js';

const advertismentRouter = new Router();
advertismentRouter.get('/advertisments', AdvertismentController.getAllAdvertisment)
advertismentRouter.get('/advertisments/:id', AdvertismentController.getAdvertismentByIDAdvert)
advertismentRouter.get('/advertismentsInProfile/:id', AdvertismentController.getAllAdvertismentByUser)
advertismentRouter.post('/advertisments', AdvertismentController.findCriteries)
advertismentRouter.post('/createAdvertisments',
body('').custom( async(body) => {
    let advertWithMainSettings = JSON.parse(body.advertWithMainSettings)
    let dopSettings = JSON.parse(body.dopSettings)
    console.log('SUM')
    console.log('lets go')
    console.log(dopSettings)
    advertWithMainSettings.cost = typeof (advertWithMainSettings.cost) == 'string' ? advertWithMainSettings.cost.replace(/ /g, '') : advertWithMainSettings.cost
        advertWithMainSettings.mileage = typeof (advertWithMainSettings.mileage) == 'string' ? advertWithMainSettings.mileage.replace(/ /g, '') : advertWithMainSettings.mileage
        let errors = {}
        for (let pool in advertWithMainSettings) {
            switch (pool) {
                case 'title':
                    if (isNaN(Number(advertWithMainSettings.title)) == false || advertWithMainSettings.title == '') {
                        errors = {
                            ...errors,
                            title: 'Название должно содержать буквы'
                        }
                    }
                    break;
                case 'category':
                    if (await findCategory(advertWithMainSettings.category)) {
                        errors = {
                            ...errors,
                            category: 'Категории не существует/не указана'
                        }
                    }
                    break;
                case 'cost':
                    if (isNaN(Number(advertWithMainSettings.cost)) == true) {
                        errors = {
                            ...errors,
                            cost: 'Цена указывается числом'
                        } 
                    } 
                    break;
                case 'mileage':
                    console.log('МОЯ МИЛЯ')
                    if (isNaN(Number(advertWithMainSettings.mileage)) == true) {
                        errors = {
                            ...errors,
                            mileage: 'Пробег указывается в км/мт.ч. числом'
                        }
                    } 
                    break;
                case 'brand':
                    if (await findBrand(advertWithMainSettings.brand)) {
                        errors = {
                            ...errors,
                            brand: 'Бренда не существует/не указан'
                        }
                    }
                    break;
                default:
                    break
            }
        }
        async function check (dopSettings) {
            try {
                let errors = {};
                let res = await Promise.all(
                    dopSettings.map( async (dopS) => {
                        console.log(dopS.subcategory)
                        console.log(dopS.subcategorytype == 'number' && dopS.value )
                        console.log('sallah')
                        if (dopS.subcategorytype == 'number' && dopS.value != undefined && isNaN(Number(dopS.value))) {
                                console.log('TOUCH YOU')
                                errors = {
                                    ...errors,
                                    [dopS.subcategory]:'Некорректное значение'
                                }
                                return 
                        } else if (dopS.subcategorytype == 'string' && dopS.value != undefined && dopS.value != ''){
                           
                            console.log('TOUCH ME')
                            
                            console.log(dopS)
                          let rez =  await findSpareCheck(dopS.category,dopS.subcategory,dopS.value)
                          console.log('af')
                          console.log(rez)
                          console.log(rez.length)
                          if (rez.length == 0) {
                            errors = {
                                ...errors,
                                [dopS.subcategory]:'Некорректное значение'
                            }
                            return  
                          }
            }}))
                    console.log('ALLAH')
                    console.log(errors)
            return errors
            } catch(e) {
                console.log('sorry')
                console.log(e)
            }
        }
        let dopSettingsError = await check(dopSettings)
        errors = {...errors,...dopSettingsError}
        console.log('ВОт это ошибки')
        console.log(dopSettingsError)
        if ((Object.keys(errors).length != 0)) {
            console.log(errors)
            throw errors
        }
}), authMiddleWare, AdvertismentController.createAdvertisment)
advertismentRouter.post('/filteredAdvert', AdvertismentController.getAllFilteredAdvertisment)
advertismentRouter.put('/updateAdvertisments/:id',
body('').custom( async(body) => {
    let advertWithMainSettings = JSON.parse(body.advertWithMainSettings)
    let dopSettings = JSON.parse(body.dopSettings)
    console.log('SUM')
    console.log('lets go')
    console.log(dopSettings)
    advertWithMainSettings.cost = typeof (advertWithMainSettings.cost) == 'string' ? advertWithMainSettings.cost.replace(/ /g, '') : advertWithMainSettings.cost
        advertWithMainSettings.mileage = typeof (advertWithMainSettings.mileage) == 'string' ? advertWithMainSettings.mileage.replace(/ /g, '') : advertWithMainSettings.mileage
        let errors = {}
        for (let pool in advertWithMainSettings) {
            switch (pool) {
                case 'title':
                    if (isNaN(Number(advertWithMainSettings.title)) == false || advertWithMainSettings.title == '') {
                        errors = {
                            ...errors,
                            title: 'Название должно содержать буквы'
                        }
                    }
                    break;
                case 'category':
                    if (await findCategory(advertWithMainSettings.category)) {
                        errors = {
                            ...errors,
                            category: 'Категории не существует/не указана'
                        }
                    }
                    break;
                case 'cost':
                    if (isNaN(Number(advertWithMainSettings.cost)) == true) {
                        errors = {
                            ...errors,
                            cost: 'Цена указывается числом'
                        } 
                    } 
                    break;
                case 'mileage':
                    console.log('МОЯ МИЛЯ')
                    if (isNaN(Number(advertWithMainSettings.mileage)) == true) {
                        errors = {
                            ...errors,
                            mileage: 'Пробег указывается в км/мт.ч. числом'
                        }
                    } 
                    break;
                case 'brand':
                    if (await findBrand(advertWithMainSettings.brand)) {
                        errors = {
                            ...errors,
                            brand: 'Бренда не существует/не указан'
                        }
                    }
                    break;
                default:
                    break
            }
        }
        async function check (dopSettings) {
            try {
                let errors = {};
                let res = await Promise.all(
                    dopSettings.map( async (dopS) => {
                        console.log(dopS.subcategory)
                        console.log(dopS.subcategorytype == 'number' && dopS.value )
                        console.log('sallah')
                        if (dopS.subcategorytype == 'number' && dopS.value != undefined && isNaN(Number(dopS.value))) {
                                console.log('TOUCH YOU')
                                errors = {
                                    ...errors,
                                    [dopS.subcategory]:'Некорректное значение'
                                }
                                return 
                        } else if (dopS.subcategorytype == 'string' && dopS.value != undefined && dopS.value != ''){
                            console.log('TOUCH ME')
                          let rez =  await findSpareCheck(dopS.category,dopS.subcategory,dopS.value)
                          console.log('af')
                          console.log(rez)
                          console.log(rez.length)
                          if (rez.length == 0) {
                            errors = {
                                ...errors,
                                [dopS.subcategory]:'Некорректное значение'
                            }
                            return  
                          }
            }}))
                    console.log('ALLAH')
                    console.log(errors)
            return errors
            } catch(e) {
                console.log('sorry')
                console.log(e)
            }
        }
        let dopSettingsError = await check(dopSettings)
        errors = {...errors,...dopSettingsError}
        if ((Object.keys(errors).length != 0)) {
            console.log(errors)
            throw errors
        }
}), authMiddleWare, AdvertismentController.updatedAdvertisment)
advertismentRouter.delete('/advertisments/:id', AdvertismentController.deleteAdvert)
//
export default advertismentRouter

/*

    body('advertWithMainSettings').custom(async (advertWithMainSettings) => {
        console.log("HI")
        advertWithMainSettings = JSON.parse(advertWithMainSettings)
        advertWithMainSettings.cost = typeof (advertWithMainSettings.cost) == 'string' ? advertWithMainSettings.cost.replace(/ /g, '') : advertWithMainSettings.cost
        advertWithMainSettings.mileage = typeof (advertWithMainSettings.mileage) == 'string' ? advertWithMainSettings.mileage.replace(/ /g, '') : advertWithMainSettings.mileage
        let errors = {}
        for (let pool in advertWithMainSettings) {
            switch (pool) {
                case 'title':
                    if (isNaN(Number(advertWithMainSettings.title)) == false || advertWithMainSettings.title == '') {
                        errors = {
                            ...errors,
                            title: 'Название должно содержать буквы'
                        }
                    }
                    break;
                case 'category':
                    if (await findCategory(advertWithMainSettings.category)) {
                        errors = {
                            ...errors,
                            category: 'Категории не существует/не указана'
                        }
                    }
                    break;
                case 'cost':
                    if (isNaN(Number(advertWithMainSettings.cost)) == true) {
                        errors = {
                            ...errors,
                            cost: 'Цена указывается числом'
                        } 
                    } 
                    break;
                case 'mileage':
                    console.log('МОЯ МИЛЯ')
                    if (isNaN(Number(advertWithMainSettings.mileage)) == true) {
                        errors = {
                            ...errors,
                            mileage: 'Пробег указывается в км/мт.ч. числом'
                        }
                    } 
                    break;
                case 'brand':
                    if (await findBrand(advertWithMainSettings.brand)) {
                        errors = {
                            ...errors,
                            brand: 'Бренда не существует/не указан'
                        }
                    }
                    break;
                default:
                    break
            }
        }
        console.log('SOLNCE')
        console.log(errors)
        console.log('el')
        if ((Object.keys(errors).length != 0)) {
            console.log(errors)
            throw errors
        }

    }),
    body('dopSettings')
    .custom( async(dopSettings) => {
        let errors = {};
        dopSettings = JSON.parse(dopSettings)
        async function check (dopSettings) {
            try {
                let errors = {};
                let res = await Promise.all(
                    dopSettings.map( async (dopS) => {
                        console.log(dopS.subcategory)
                        console.log(dopS.subcategorytype == 'number' && dopS.value )
                        console.log('sallah')
                        if (dopS.subcategorytype == 'number' && dopS.value != undefined && isNaN(Number(dopS.value))) {
                                console.log('TOUCH YOU')
                                errors = {
                                    ...errors,
                                    [dopS.subcategory]:'Некорректное значение'
                                }
                                return 
                        } else if (dopS.subcategorytype == 'string' && dopS.value != undefined){
                            console.log('TOUCH ME')
                          let rez =  await findSpareCheck(dopS.category,dopS.subcategory,dopS.value)
                          console.log('af')
                          console.log(rez)
                          console.log(rez.length)
                          if (rez.length == 0) {
                            errors = {
                                ...errors,
                                [dopS.subcategory]:'Некорректное значение'
                            }
                            return  
                          }
            }}))
                    console.log('ALLAH')
                    console.log(errors)
            return errors
            } catch(e) {
                console.log('sorry')
                console.log(e)
            }
        }

         errors = await check(dopSettings)
         console.log('as')
         console.log(errors)
            if ((Object.keys(errors).length != 0)) {
                throw errors
            }
        }
        )
        */
