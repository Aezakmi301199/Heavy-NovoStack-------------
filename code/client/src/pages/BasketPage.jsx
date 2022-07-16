import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../App'
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import classes from './imgPages/BasketPage.module.css'
import Item from '../components/UI/Item/Item';
import { makeNormalDateAndTime } from '../utils/function';

const BasketPage = () => {
  const [basket,setBasket] = useState({items:[]})
const getFromBasket = async(user_id) => {
  await axios.get(`/basket`,{params:{user_id:user_id}}).then(res => setBasket({...basket,items:res.data}))
}
console.log(basket)
const {store} = useContext(AuthContext)
  useEffect( () =>{
    if (store.isAuth) {
      getFromBasket(store.user.id)
    }
  },[store.isAuth])
console.log(basket.items)
  return (
    <div>
       <div className={classes.items}>
               { basket.items.length 
               ?  basket.items.map(advt => <Item 
                key={advt.advt_id}
                advt={advt} 
                />)
               : <h2 style={{textAlign:'center'}}>Корзина пуста</h2>

               }
             
               
          </div>
    </div>
  )
}

export default observer(BasketPage)

/*
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
            adverts[i] = {...adverts[i],pictures,dopSettings:dopSettings}
         }
        
        return basketAdverts

*/