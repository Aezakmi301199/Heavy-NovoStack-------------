import { db } from "../database/db.js"
import * as fs from 'fs';
function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}
class CategoryService {

 async findAllBrandByCategory (category) {
return await db('brand').select('id','brand').where({category})
}


async findAllCategory () {
 return await db('category').select('id','category')
 }
 async getAllCategory () {
  return await db('category').select('*')
  }
 async dellCategory (category) {
  let msDel = await db('category').del().where({category}).returning('*') 
  return msDel[0]
  }
  async createCategory (category,inputNumber,inputString,brand,picture) {
   let responseFromServer = await db('category').insert({
    category,
    path_icon:`/categoryAvatars/${category}/${picture.name}`
   }).returning('id')
   let {id} = responseFromServer[0]
   
   if (id && inputNumber?.length > 0){
    let inputNumberInDB = []
    for (let i=0;i<inputNumber.length;i++){
      let objInputNumber = {
        category:category, 
        subcategory:inputNumber[i].subcategory,
        min:Number(inputNumber[i].min),
        max:Number(inputNumber[i].max),
        unit:inputNumber[i].unit,
        subcategorytype:'number'}
        inputNumberInDB.push(objInputNumber) 
    }
    await db('undercategories').insert([...inputNumberInDB])
  }

    if (id && inputString?.length > 0){
      let inputStringInDB = []
      let spares = []
      for (let i=0;i<inputString.length;i++){
        let inputStringSpares= inputString[i].spares;
        let objInputString = {category:category, subcategory:inputString[i].subcategory,subcategorytype:'string'}
        inputStringInDB.push(objInputString)
        for (let i =0;i<inputStringSpares.length;i++){
          let spare = {
            value:inputStringSpares[i].value,
            category:objInputString.category,
            subcategory:objInputString.subcategory}
            spares.push(spare)
        } 
      }
      await db('undercategories').insert([...inputStringInDB])
      await db('spares').insert([...spares])
    }

    if (brand.length >0) {
     let brandInDB = brand.map(br =>  {return {brand:br.value,category:category}})
     await db('brand').insert([...brandInDB])
    }
    const pathToDirCategory= `${process.cwd()}/stor/categoryAvatars`;
    const pathToDirCategoryID = `${pathToDirCategory}/${category}`;
    fs.stat(pathToDirCategoryID, function (err, stats) {
        if (err) {
            console.log('Norm2.0')
            fs.mkdir(`${pathToDirCategoryID}`, {
                recursive: true
            }, (err) => {
                console.log('pzdc')
                if (err) {
                    console.log('Norm3.0')
                    console.log(err)
                } else {
                  picture.mv(`${pathToDirCategoryID}/${picture.name}`, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
                }
            })
        } else {
          picture.mv(`${pathToDirCategoryID}/${picture.name}`, function (err) {
            if (err) {
                console.log(err)
            }
        })
        }
    })
    
    }

    async updateCategory (category,inputNumber,inputString) {

      if (inputNumber.length > 0){
        let  undercategoryFromDB = await db('undercategories').select('id').where({category,subcategorytype:'number'})
        inputNumber = inputNumber.map(numb => { 
                let numbCopy = {
                  category:category,
                  subcategory:numb.subcategory,
                  min:Number(numb.min),
                  max:Number(numb.max),
                  unit:numb.unit,
                  subcategorytype:'number'
                }
                if (numb.id > 1000000){
                  return numbCopy
                } else {
                 return numbCopy = {
                    ...numbCopy,
                    id:numb.id,
                  }
                }
        })

        let newUnderCategory = inputNumber
        .filter(number => undercategoryFromDB.findIndex(numberfromfb =>numberfromfb.id  == number.id) === -1 )

        let deleteUnderCategory = undercategoryFromDB
            .filter(number => inputNumber.findIndex(numberfromfb =>numberfromfb.id  == number.id) === -1)
            .map(object => object.id)

        let updateUnderCategory = inputNumber
            .filter(number => undercategoryFromDB.findIndex(numberfromfb =>numberfromfb.id  == number.id) != -1)
            
            if (newUnderCategory.length > 0) {
              await db('undercategories').insert([...newUnderCategory])
            }
             if (deleteUnderCategory.length > 0) {
              await db('undercategories').del().whereIn('id',[...deleteUnderCategory])
            }
            if (updateUnderCategory.length > 0) {
              for (let i=0;i<updateUnderCategory.length;i++){
                await db('undercategories').update(updateUnderCategory[i]).where({id:updateUnderCategory[i].id})
              }            
            }
      } else if (inputNumber.length == 0) {
        await db('undercategories').del().where({category,subcategorytype:'number'}); 
      }     

      if (inputString.length > 0){
        let inputStringInDB = []
        let globalnewSpares = []
        let globalDeleteSpares = []
        for (let i=0;i<inputString.length;i++){
          if (inputString[i].id< 1000000 && inputString[i]?.spares){
            let spares = []
            let inputStringSpares= inputString[i].spares;
            let objInputString = {id:inputString[i].id,category:category, subcategory:inputString[i].subcategory,subcategorytype:'string'}

            for (let i =0;i<inputStringSpares.length;i++){
              let spare = {
                value:inputStringSpares[i].value,
                category:objInputString.category,
                subcategory:objInputString.subcategory}
                if (inputStringSpares[i]?.id){
                  spare ={
                    ...spare,
                    id:inputStringSpares[i]?.id
                  }
                }
                spares.push(spare)
            }
            const sparesFromDBByCategory = await db('spares').select('id').where({category:category,subcategory:inputString[i].subcategory})

            let newSpares = spares
            .filter(inputStringSpare => sparesFromDBByCategory.findIndex(spare =>spare.id  == inputStringSpare.id) === -1 )

            let deletedSpares = sparesFromDBByCategory
            .filter(spareFromDB => spares.findIndex(spare =>spare.id  == spareFromDB.id) === -1)
            .map(object => object.id)
            inputStringInDB = [...inputStringInDB,objInputString]
            globalnewSpares = [...globalnewSpares,...newSpares]
            globalDeleteSpares = [...globalDeleteSpares,...deletedSpares]

          } else if (inputString[i].id> 1000000) {
            let spares = []
            let inputStringSpares= inputString[i].spares;
            let objInputString = {category:category, subcategory:inputString[i].subcategory,subcategorytype:'string'}
            for (let i =0;i<inputStringSpares.length;i++){
              let spare = {
                value:inputStringSpares[i].value,
                category:objInputString.category,
                subcategory:objInputString.subcategory}
                spares.push(spare)
            }
            inputStringInDB = [...inputStringInDB,objInputString]
            globalnewSpares = [...globalnewSpares,...spares]
          }  else {
            let objInputString = {id:inputString[i].id,category:category, subcategory:inputString[i].subcategory,subcategorytype:'string'}
            inputStringInDB = [...inputStringInDB,objInputString]
          }
        } 

       let  undercategoryFromDB = await db('undercategories').select('id').where({category,subcategorytype:'string'})
       
       let newUnderCategory = inputStringInDB
       .filter(inputStringUnderCategory => undercategoryFromDB.findIndex(undercategoryFromDB =>undercategoryFromDB.id  == inputStringUnderCategory.id) === -1);
       let deleteUnderCategory = undercategoryFromDB
       .filter(undercategory => inputStringInDB.findIndex(inputStringUnderCategory =>inputStringUnderCategory.id  == undercategory.id) === -1)
       .map(object => object.id)

       if (globalnewSpares.length > 0) {
        await db('spares').insert([...globalnewSpares])
      }
       if (globalDeleteSpares.length > 0) {
        await db('spares').del().whereIn('id',[...globalDeleteSpares])
      }
      if (newUnderCategory.length > 0) {
        await db('undercategories').insert([...newUnderCategory])
      }
      if (deleteUnderCategory.length > 0) {
        await db('undercategories').del().whereIn('id',[...deleteUnderCategory])
      }
  
      } else if (inputString.length == 0) {
        await db('undercategories').del().where({category,subcategorytype:'string'}); 
      } 


}

async getCategoryAndBrand () {
  console.log('ВСЁ ОК')
  let category = await db('category').select('*')
  let brand = await db('brand').select('*')
  let smersh = []
  console.log('СВЁ')
  console.log('category')
  for (let i =0;i<category.length;i++){
   let brandFromCat = brand.filter( brand => brand.category == category[i].category)
   smersh = [...smersh,{
    path_icon:category[i].path_icon,
    category:category[i].category,
    brand: brandFromCat}]
  }
  return smersh
  }
}
export default new CategoryService()

/*
     if (globalDeleteSpares.length > 0) {
        await db('spares').del().where([...globalDeleteSpares])
      }
      if (globalnewSpares.length > 0) {
        await db('spares').insert([...globalnewSpares])
      }
      if (deleteUnderCategory.length > 0) {
        await db('undercategories').del().where([...deleteUnderCategory])
      }
      if (newUnderCategory.length > 0) {
        await db('undercategories').insert([...newUnderCategory])
      }
*/