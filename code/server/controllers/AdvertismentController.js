import AdvertismentService from "../services/AdvertismentService.js";
import {
    body,
    validationResult
} from 'express-validator';
import ApiError from "../exceptions/ApiError.js";
import {
    api_client
} from "../config.js";
import {
    db
} from "../database/db.js";

// then(res => console.log(res.data))
class AdvertismentController {
    async findCriteries(req, res, next) {
        try {
            const criteriesObject = await AdvertismentService.findCriteries(req.body)
            res.json(criteriesObject)
        } catch (e) {
            next(e)
        }
    }
    async updatedAdvertisment(req, res, next) {
        try {
            let {
                advertWithMainSettings,
                dopSettings,
                deletePic
            } = req.body;
            console.log(advertWithMainSettings)
            
            advertWithMainSettings = JSON.parse(advertWithMainSettings)
            dopSettings = JSON.parse(dopSettings)
            deletePic = JSON.parse(deletePic)
            req.files = req.files == null ? {pictures:[]} : Array.isArray(req.files.pictures) ? {pictures:[...req.files.pictures]} : {pictures:[req.files.pictures]}
            let allPic = [...req.files.pictures,...advertWithMainSettings.pictures]           
            let validationCheck = validationResult(req);

            if (validationCheck.errors.length) {
                throw ApiError.BadRequest('Введены некорректные данные', validationCheck.errors[0].msg)
            } else if (allPic.length === 0) {
                  throw ApiError.BadRequest('Введены некорректные данные', {
                      pictures: 'Необходимо мин 1 фото'
                  })
            }
            console.log('VASKA') // req.files
            console.log(dopSettings)

            const dopSet = await AdvertismentService
            .updateAdvertisment(
                advertWithMainSettings,
                dopSettings,
                req.files.pictures,
                deletePic,
                req.user.id)
            res.status(200).json(dopSet)
        } catch (e) {
            next(e)
        }
    }
    async getAllAdvertisment(req, res, next) {
        try {
            const advert = await AdvertismentService.getAllAdvertisment()
            res.json(advert)
        } catch (e) {
            next(e)
        }
    }
    async getAllFilteredAdvertisment(req, res, next) {
        try {
            const {
                mainSettings,
                dopSettings
            } = req.body
            const filteredadvert = await AdvertismentService.getAllFilteredAdvertisment(mainSettings, dopSettings)
            res.json(filteredadvert)
        } catch (e) {
            next(e)
        }
    }
    async getAdvertismentByIDAdvert(req, res, next) {
        try {
            const advert = await AdvertismentService.getAdvertismentByIDAdvert(req.params.id)
            console.log(advert)
            res.json(advert)
        } catch (e) {
            next(e)
        }
    }
    async getAllAdvertismentByUser(req, res, next) {
        try {
            console.log("NE NADO")
            //   const userAdverts = await AdvertismentService.getAllAdvertisment()
            const abrakadabra = await AdvertismentService.getAllAdvertismentByUser(req.params.id)
            console.log(abrakadabra)
            res.json(abrakadabra)
        } catch (e) {
            next(e)
        }
    }
    async createAdvertisment(req, res, next) {
        try {
            let validationCheck = validationResult(req);
            console.log(validationCheck)
            console.log(req.files)
            if (validationCheck.errors.length) {
                throw ApiError.BadRequest('Введены некорректные данные', validationCheck.errors[0].msg)
            } else if (req.files == null) {
                throw ApiError.BadRequest('Введены некорректные данные', {
                    pictures: 'Необходимо мин 1 фото'
                })
            }
            let {
                advertWithMainSettings,
                dopSettings
            } = req.body;
            console.log('LAGGGGGGGGGGER')
            console.log(req.body)
            console.log(advertWithMainSettings)
            console.log('DASDA')
            console.log(dopSettings)
            const idAdvert = await AdvertismentService
                .createAdvertisment(
                    JSON.parse(advertWithMainSettings),
                    JSON.parse(dopSettings),
                    req.files.pictures,
                    req.user.id)
            res.json(idAdvert)
        } catch (e) {
            next(e)
        }
    }
    async deleteAdvert(req, res, next) {
        try {
            const deleteAdvertID = await AdvertismentService.deleteAdvert(req.params.id)
            res.json(deleteAdvertID)
        } catch (e) {
            next(e)
        }
    }

}

export default new AdvertismentController();

/*


         .where(function () {
             if (objectCriteries.cost && (Object.keys(objectCriteries).length == 1)){
                this
                .where('advt.cost','>',objectCriteries.cost.min)
             //   .andWhere('advt.cost', '<', objectCriteries.cost.max)
            
             } 
            else if(objectCriteries.category && (Object.keys(objectCriteries).length == 1)){
                this
                .where('advt.category',objectCriteries.category)
            }})


*/