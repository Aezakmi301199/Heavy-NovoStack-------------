import { db } from "../database/db.js"


class BaskerService {
    async getAllbasketAdvert (user_id) {
     const basketAdverts = await db('basket')
        .select({
         advt_id:'advt.id',
         user_id:'u.id',
         user_login:'u.login',
         title:'advt.title',
         exposition:'advt.exposition',
         category:'advt.category',
         cost:'advt.cost',
         create_at:'advt.create_at',
         location:'advt.location',
         mileage:'advt.mileage',
         })
        .leftJoin({u:'userclient'},{'basket.user_id':'u.id'})
        .leftJoin({advt:'advertisment'},{'basket.advert_id':'advt.id'})
        .where('basket.user_id','=',user_id)
        .orderBy('basket.id','desc')
         for (let i = 0;i<basketAdverts.length;i++){
            let pictures =  await db('pictureadvertisment')
            .select('id','path')
            .where('pictureadvertisment.advert_id','=',basketAdverts[i].advt_id)
            let dopSettings = await db({dopSettings:'advertismentdopsettings'})
            .select({subcategory:'dopSettings.subcategory',value:'dopSettings.value',unit:'undercategories.unit'})
            .leftJoin('undercategories',{'undercategories.subcategory':'dopSettings.subcategory'})
            // .where('dopSettings.advert_id','=',id)
            .where(function () {
               this // dopSettings.advert_id
               .where({'dopSettings.advert_id': basketAdverts[i].advt_id})
               .andWhere({'undercategories.category': basketAdverts[i].category})
            })
            basketAdverts[i] = {...basketAdverts[i],pictures,dopSettings:dopSettings}
         }
        
        return basketAdverts


     }
     async addAdvertBasket (advert_id,user_id) {
        await db('basket').insert({
            advert_id,
            user_id
        })
     }
     async removeAdvertBasket (advert_id,user_id) {
        await db('basket').del().where({advert_id,user_id})
     }
     async checkBasketBigItem (advert_id,user_id) {
        const response= await db('basket').select('*').where({advert_id,user_id}).first()
        if (response == undefined) { return false} else { return true}
     }
     async getBasketCount (user_id) {
       return await db('basket').select('id').where({user_id})
     }

     
}
export default new BaskerService()