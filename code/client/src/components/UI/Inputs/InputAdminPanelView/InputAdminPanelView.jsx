import React from 'react'
import InputFromDB from '../InputFromDB/InputFromDB'
import classes from './InputAdminPanelView.module.css'
import search from '../../../../img/adminSearch.png'
import $api from '../../../../utils/AxiosInterceptors'
import SuperUniversalModal from '../../Modals/SuperUniversalModal/SuperUniversalModal'
import { useState } from 'react'
const InputAdminPanelView = ({ searchInBaseBy, errorValidatorCriterieSetting, textContent, criterieSetting, sendSearchOption, searchOptionBack, searchOptionBoolean, searchOptionFrontSAVED, searchOptionFront, error, setSearchOptionBack, setFrontSearchBoolean, setSearchOptionFront, setSearchOptionFrontSAVED }) => {

  const findInBack = async (criterieSetting, searchInBaseBy) => {
    try {
      if (criterieSetting && searchOptionBack[criterieSetting]) {
        await $api.get(`/categoryBrand/${searchOptionBack[criterieSetting]}`)
          .then(res => { setModalVisible(!modalVisible); setFindedItems(res.data) })
      }
    } catch (e) {
    } finally {
    }
  }

  const [modalVisible, setModalVisible] = useState(false)
  const [findedItems, setFindedItems] = useState([])
  console.log(findedItems)
  return (
    <div className={classes.inputAdminPanelView}>
      <h5>{textContent}</h5>
      <div className='flexRowAlignCenter marginLeftRight5pxAll'>
        <InputFromDB
          criterieSetting={criterieSetting}
          sendSearchOption={sendSearchOption}
          searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
          searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
          searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
          searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
          error={errorValidatorCriterieSetting}
        />
        <img
          onClick={e => findInBack(criterieSetting, searchInBaseBy)}
          src={search} className='img20px20px' />
      </div>
      <SuperUniversalModal visible={modalVisible} setVisible={setModalVisible} id={'gainsboro'}>
        {findedItems.length > 0
          ? findedItems.map(item =>
            <div key={item.id} className={'flexRowAlignCenter marginLeftRight5pxAll'}>
              <h5>ID - {item.id}</h5>
              <h5>Бренд - {item.brand}</h5>
            </div>)
          : <h3>Бренды не добавлены</h3>}
      </SuperUniversalModal>
    </div>

  )
}

export default InputAdminPanelView