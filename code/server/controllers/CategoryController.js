import CategoryService from "../services/CategoryService.js";
import {
    body,
    validationResult
} from 'express-validator';
import ApiError from "../exceptions/ApiError.js";
class CategoryController {

    async findAllBrandByCategory(req, res, next) {
        try {
            const brand = await CategoryService.findAllBrandByCategory(req.params.category)
            // obj { {room_id,messages:[]}}
            res.json(brand)
        } catch (e) {
            next(e)
        }
    }

    async getAllCategory(req, res, next) {
        try {
            const category = await CategoryService.getAllCategory()
            // obj { {room_id,messages:[]}}
            res.json(category)
        } catch (e) {
            next(e)
        }
    }
    
    async findAllCategory(req, res, next) {
        try {
            const category = await CategoryService.findAllCategory()
            // obj { {room_id,messages:[]}}
            res.json(category.length)
        } catch (e) {
            next(e)
        }
    }
    async dellCategory(req, res, next) {
        try {
           // console.log(req.params.category)
           const categoryDeleted = await CategoryService.dellCategory(req.params.category)
           console.log(categoryDeleted)
            // obj { {room_id,messages:[]}}
            res.json(categoryDeleted)
        } catch (e) {
            next(e)
        }
    }
    async createCategory(req, res, next) {
        try {
            let validationCheck = validationResult(req);
            req.body.category = JSON.parse(req.body.category)
            console.log('NET ')
            if (validationCheck.errors.length) {
                throw ApiError.BadRequest('Введены некорректные данные', validationCheck.errors[0].msg)
            } else if (req.files == null) {
                throw ApiError.BadRequest('При создании кат-ии фотку не загружена',
                    {
                        inputNumber: [],
                        inputString: [],
                        category: '',
                        brand: '',
                        pictures:'Необходимо мин.1 фото'
                      })                
            }
            let {category,inputNumber,inputString,brand} = req.body.category
           const createdCategory = await CategoryService.createCategory(category,inputNumber,inputString,brand,req.files.pictures)

           //console.log(categoryDeleted)
            // obj { {room_id,messages:[]}}
           // res.json(categoryDeleted)
           res.json()
        } catch (e) {
            next(e)
        }
    }
    async updateCategory(req, res, next) {
        try {
            let validationCheck = validationResult(req);
            console.log(validationCheck)
            if (validationCheck.errors.length) {
                throw ApiError.BadRequest('Введены некорректные данные', validationCheck.errors[0].msg)
            }
            let {category,inputNumber,inputString,brand} = req.body
         const updateCategory = await CategoryService.updateCategory(category,inputNumber,inputString)
           //console.log(categoryDeleted)
            // obj { {room_id,messages:[]}}
           // res.json(categoryDeleted)
           res.json()
        } catch (e) {
            next(e)
        }
    }

    async getCategoryAndBrand(req, res, next) {
        try {
         const categoryAndBrand = await CategoryService.getCategoryAndBrand()
         console.log('JE')
         console.log(categoryAndBrand)
         res.json(categoryAndBrand)
        } catch (e) {
            next(e)
        }
    }
}


export default new CategoryController();
/*

 const fnCheckPoolInputNumberStr = (object,namePool,objectError,textErrorEmpty,textErrorNumber) => {
  console.log(inputNumber[0]['unit'])
  console.log(object[namePool])
  console.log('vhod')
  if (isNaN(Number(object[namePool])) == false  ) {
    console.log('ZAHOD V BAU')
    objectError = {
     ...objectError,
    [namePool]:textErrorNumber
     }} else if (inputNumber[i]['unit'].length == '') {
      objectError = {
       ...objectError,
       [namePool]: textErrorEmpty
     }
  }
  console.log(objectError)
}

*/