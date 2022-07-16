import axios from 'axios'
import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext } from '../App'
import ExitButton from '../components/UI/buttons/ExitButton/ExitButton'
import Item from '../components/UI/Item/Item'
import UniversalModal from '../components/UI/Modals/UniversalModal/UniversalModal'
import $api from '../utils/AxiosInterceptors'
import { makeNormalDateAndTime } from '../utils/function'
import { errorValidatorCreateAdvert } from '../utils/useStateObjects'

import classes from './imgPages/AdvertisementPage.module.css'
const MyAdvertPage = () => {

  const { store } = useContext(AuthContext)
  // ***************************************************************
  // ? ХУКИ 
  const [advert, setAdvert] = useState([])
  const [modal, setModal] = useState({ changeModal: false, children: <div></div> })
  const [errorValidator, setErrorValidator] = useState({ errorValidatorCreateAdvert });

  useEffect(() => {
    getAdvert();
    // return () => { }
  }, [])
  // ***************************************************************

  // ***************************************************************
  // ? ФУНКЦИИ 
  const getAdvert = async () => {
    await $api.get(`/advertismentsInProfile/${store.user.id}`).then(res => { setAdvert(res.data); console.log(res.data) })
  }


  /*
         <div className={classes.cont_flex_rigt}>
            <ExitButton onClick={e => updateAdvert(advert[advert.findIndex(advt => advt.advt_id == modal.children.props.paramID)])} textContent={'Сохранить изменения'} />
            <ExitButton onClick={e => setModal({ ...$api, changeModal: false })} textContent={'Закрыть окно'} />
          </div>
  */
  // ***************************************************************

  return (
    <div className={classes.advertisment} >
      <UniversalModal id={classes.universal_pos_myadvert} visible={modal.changeModal}>
        {modal.children
          ? modal.children
          : ''}
      </UniversalModal>
      <div className={classes.items}>
        {advert.length
          ? advert.map(advt => <Item
            myadvert={true}
            changeModal={modal}
            setChangeModal={setModal}
            removeCheck={true}
            advt={advt}
            key={advt.advt_id}
          />)
          : <h2 style={{ textAlign: 'center' }}>Объявлений нет</h2>
        }
      </div>
    </div >
  )

}

export default MyAdvertPage