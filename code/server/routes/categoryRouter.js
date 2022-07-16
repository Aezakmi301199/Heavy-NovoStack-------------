import Router from 'express'
import CategoryController from '../controllers/CategoryController.js';
import authMiddleWare from '../middleWare/authMiddleWare.js';
import {
 body
} from 'express-validator';



const categoryRouter = new Router();
categoryRouter.get('/category', CategoryController.getAllCategory)
categoryRouter.get('/categoryAndBrand', CategoryController.getCategoryAndBrand)
categoryRouter.get('/categoryBrand/:category',authMiddleWare, CategoryController.findAllBrandByCategory)
categoryRouter.get('/categoryCount',authMiddleWare, CategoryController.findAllCategory)
categoryRouter.post('/category',body('category').custom(body => {
  body = JSON.parse(body)
console.log(body)

  
 let {category,inputString,inputNumber} = body
 console.log('OP')
 console.log(body)
 let errors = {inputNumber:[],inputString:[]}

errors = fnCheckPoolInputNumberStr(body,'category',errors,'Название категории не должно быть пустым','Название категории не должно быть числом')
errors = fnCheckPoolInputNumberStr(body,'brand',errors,'Необходим мин.1 бренд','Название категории не должно быть числом')
console.log('change')
for (let i =0;i<inputNumber.length;i++) {
  console.log(inputNumber[i])
    if (inputNumber[i] == '') {
      let oneErrorNumber = {}
      oneErrorNumber={
        subcategory: 'Название настройки не должно быть пустым',
        min:'Поле не должно быть пустым',
        max:'Поле не должно быть пустым',
        unit: 'СИ не должна быть пустым'
      }
      errors = {
        ...errors,
        inputNumber:[...errors.inputNumber,oneErrorNumber]
      }
    } else {
      let oneErrorNumber = {}
      console.log('stasr')
      console.log(inputNumber[i])
      oneErrorNumber = fnCheckPoolInputNumberNum(inputNumber[i],'min',oneErrorNumber,'Поле не должно быть пустым','Некорректное числовое значение')
      oneErrorNumber = fnCheckPoolInputNumberNum(inputNumber[i],'max',oneErrorNumber,'Поле не должно быть пустым','Некорректное числовое значение')
      oneErrorNumber = fnCheckPoolInputNumberStr(inputNumber[i],'subcategory',oneErrorNumber,'Название настройки не должно быть пустым','Название поднастройки не должно быть числом')
      oneErrorNumber = fnCheckPoolInputNumberStr(inputNumber[i],'unit',oneErrorNumber,'Поле СИ не должно быть пустым','Поле СИ не должно быть числом')
        console.log('normal')
        console.log(oneErrorNumber)
          if ((Object.keys(oneErrorNumber).length > 0)) {
           oneErrorNumber = {
            ...oneErrorNumber,
            id: inputNumber[i]['id']
          }
          errors = {
           ...errors,
           inputNumber:[...errors.inputNumber,oneErrorNumber]
         }}
         oneErrorNumber= {}
    }
}
for (let i =0;i<inputString.length;i++) {
    if (inputString[i] == '') {
      let oneErrorNumber = {}
      oneErrorNumber={
        valueError: 'Пусто поле',
      }
      errors = {
        ...errors,
        inputString:[...errors.inputString,oneErrorNumber]
      }
    } else {
      let oneErrorNumber = {}
      console.log('stasr')
      console.log(inputString[i])
      oneErrorNumber = fnCheckPoolInputNumberStr(inputString[i],'subcategory',oneErrorNumber,'Название настройки не должно быть пустым','Название настройки не должно быть числом')
      if (oneErrorNumber.hasOwnProperty('subcategory') == false && inputString[i].spares.length == 0) {
            oneErrorNumber = {
              ...oneErrorNumber,
              valueError:'Отсутствуют ячейки выбора в поле'
            }
        } else if (oneErrorNumber.hasOwnProperty('subcategory') == true && inputString[i].spares.length != 0 ) {
          oneErrorNumber={
            valueError: oneErrorNumber.subcategory,
          }
        } else if (oneErrorNumber.hasOwnProperty('subcategory') == true && inputString[i].spares.length == 0 ) {
          if (oneErrorNumber.subcategory == 'Название настройки не должно быть пустым'){
            oneErrorNumber = {
              valueError:'Пусто поле'
            }
          }
          else {
            oneErrorNumber = {
              valueError:oneErrorNumber.subcategory
            }
          }
        }

          if (oneErrorNumber.valueError ) {
           oneErrorNumber = {
            ...oneErrorNumber,
            id: inputString[i]['id']
          }
          errors = {
           ...errors,
           inputString:[...errors.inputString,oneErrorNumber]
         }}
         oneErrorNumber= {}
    }
}
function fnCheckPoolInputNumberStr  (object,namePool,objectError,textErrorEmpty,textErrorNumber)  {
  if (isNaN(Number(object[namePool])) == false  && Number(object[namePool]) != 0) {
    objectError = {
     ...objectError,
    [namePool]:textErrorNumber
     }} else if (object[namePool] == '' || object[namePool] == undefined) {
      objectError = {
       ...objectError,
       [namePool]: textErrorEmpty
     }
  }
  return objectError
}

function fnCheckPoolInputNumberNum  (object,namePool,objectError,textErrorEmpty,textErrorNumber)  {
  console.log('SUDA')
  console.log(isNaN(Number(object[namePool])) == true)
  console.log(object[namePool] == '')
  if (isNaN(Number(object[namePool])) == true) {
    console.log('ne 4islo')
    objectError = {
     ...objectError,
     [namePool]:textErrorNumber
     }} else if (object[namePool] == '' ) {
      console.log('pusto')
      objectError = {
        ...objectError,
        [namePool]:textErrorEmpty
     }}
       return objectError
}
console.log(errors)
      if (errors.hasOwnProperty('category') || errors.inputNumber.length > 0 || errors.inputString.length > 0 || errors.hasOwnProperty('brand')) {
        console.log('ОШИБКА')
       console.log(errors)
       throw errors
   } else {
    return true
   }
}) ,authMiddleWare, CategoryController.createCategory)
categoryRouter.put('/category',body('').custom(body => {

  let {category,inputString,inputNumber} = body
  console.log('OP')
  console.log(body)
  let errors = {inputNumber:[],inputString:[]}
 
 errors = fnCheckPoolInputNumberStr(body,'category',errors,'Название категории не должно быть пустым','Название категории не должно быть числом')
 //errors = fnCheckPoolInputNumberStr(body,'brand',errors,'Необходим мин.1 бренд','Название категории не должно быть числом')
 console.log('OSHIBKA')
 console.log(errors)
 console.log('CHIKA')
 for (let i =0;i<inputNumber.length;i++) {
   console.log(inputNumber[i])
     if (inputNumber[i] == '') {
       let oneErrorNumber = {}
       oneErrorNumber={
         subcategory: 'Название настройки не должно быть пустым',
         min:'Поле не должно быть пустым',
         max:'Поле не должно быть пустым',
         unit: 'СИ не должна быть пустым'
       }
       errors = {
         ...errors,
         inputNumber:[...errors.inputNumber,oneErrorNumber]
       }
     } else {
       let oneErrorNumber = {}
       console.log('stasr')
       console.log(inputNumber[i])
       
       oneErrorNumber = fnCheckPoolInputNumberNum(inputNumber[i],'min',oneErrorNumber,'Поле не должно быть пустым','Некорректное числовое значение')
      oneErrorNumber = fnCheckPoolInputNumberNum(inputNumber[i],'max',oneErrorNumber,'Поле не должно быть пустым','Некорректное числовое значение')
       oneErrorNumber = fnCheckPoolInputNumberStr(inputNumber[i],'subcategory',oneErrorNumber,'Название настройки не должно быть пустым','Название поднастройки не должно быть числом')
       oneErrorNumber = fnCheckPoolInputNumberStr(inputNumber[i],'unit',oneErrorNumber,'Поле СИ не должно быть пустым','Поле СИ не должно быть числом')
         console.log('normal')
         console.log(oneErrorNumber)
           if ((Object.keys(oneErrorNumber).length > 0)) {
            oneErrorNumber = {
             ...oneErrorNumber,
             id: inputNumber[i]['id']
           }
           errors = {
            ...errors,
            inputNumber:[...errors.inputNumber,oneErrorNumber]
          }}
          oneErrorNumber= {}
     }
 }
 console.log('zdes net problem')
 for (let i =0;i<inputString.length;i++) {
     if (inputString[i] == '') {
       let oneErrorNumber = {}
       oneErrorNumber={
         valueError: 'Пусто поле',
         idx:i
       }
       errors = {
         ...errors,
         inputString:[...errors.inputString,oneErrorNumber]
       }
     } else {
       let oneErrorNumber = {}
       console.log('stasr')
       console.log(inputString[i])
       oneErrorNumber = fnCheckPoolInputNumberStr(inputString[i],'subcategory',oneErrorNumber,'Название настройки не должно быть пустым','Название настройки не должно быть числом')

       if (oneErrorNumber.hasOwnProperty('subcategory') == false  && inputString[i].spares?.length == 0  && inputString[i].id>100000) {
             oneErrorNumber = {
               ...oneErrorNumber,
               valueError:'Отсутствуют ячейки выбора в поле'
             }
         } else if (oneErrorNumber.hasOwnProperty('subcategory') == true && inputString[i].spares.length != 0 ) {
           oneErrorNumber={
             valueError: oneErrorNumber.subcategory,
           }
         } else if (oneErrorNumber.hasOwnProperty('subcategory') == true && inputString[i].spares.length == 0 ) {
           if (oneErrorNumber.subcategory == 'Название настройки не должно быть пустым'){
             oneErrorNumber = {
               valueError:'Пусто поле'
             }
           }
           else {
             oneErrorNumber = {
               valueError:oneErrorNumber.subcategory
             }
           }
         }
 
           if (oneErrorNumber.valueError ) {
            oneErrorNumber = {
             ...oneErrorNumber,
             id: inputString[i]['id']
           }
           errors = {
            ...errors,
            inputString:[...errors.inputString,oneErrorNumber]
          }}
          oneErrorNumber= {}
     }
 }
 console.log('A DALSHE?:')
 function fnCheckPoolInputNumberStr  (object,namePool,objectError,textErrorEmpty,textErrorNumber)  {
   if (isNaN(Number(object[namePool])) == false  && Number(object[namePool]) != 0) {
     objectError = {
      ...objectError,
     [namePool]:textErrorNumber
      }} else if (object[namePool] == '') {
       objectError = {
        ...objectError,
        [namePool]: textErrorEmpty
      }
   }
   return objectError
 }
 
 function fnCheckPoolInputNumberNum  (object,namePool,objectError,textErrorEmpty,textErrorNumber)  {
   console.log('SUDA')
   console.log(isNaN(Number(object[namePool])) == true)
   console.log(object[namePool] == '')
   if (isNaN(Number(object[namePool])) == true) {
     console.log('ne 4islo')
     objectError = {
      ...objectError,
      [namePool]:textErrorNumber
      }} else if (object[namePool] == '' ) {
       console.log('pusto')
       objectError = {
         ...objectError,
         [namePool]:textErrorEmpty
      }}
        return objectError
 }
 console.log(errors)
       if (errors.hasOwnProperty('category') || errors.inputNumber.length > 0 || errors.inputString.length > 0 || errors.hasOwnProperty('brand')) {
         console.log('ОШИБКА')
        console.log(errors)
        throw errors
    } else {
     return true
    }

}),authMiddleWare, CategoryController.updateCategory)
categoryRouter.delete('/category/:category',authMiddleWare, CategoryController.dellCategory)
//basketRouter.post('/basket', authMiddleWare, BasketController.addAdvertBasket)
//basketRouter.get('/basketBigItem/:id', authMiddleWare, BasketController.checkBasketBigItem)
//basketRouter.delete('/basket', authMiddleWare, BasketController.removeAdvertBasket)
//basketRouter.get('/basketCount', authMiddleWare, BasketController.getBasketCount)
export default categoryRouter