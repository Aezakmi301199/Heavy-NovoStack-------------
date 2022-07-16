import React, { useContext, useEffect, useState } from 'react'
import classes from './BigItem.module.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MoreButton from '../buttons/MoreButton/MoreButton';
import { useNavigate } from 'react-router-dom';
import ProfileButton from '../buttons/ProfileButton/ProfileButton';
import BigAdvertButton from '../buttons/BigAdverButton/BigAdvertButton';
import axios from 'axios';
import { convertMoneyTo1000, makeNormalDateAndTime, removeItemFromArray, removeToBasket, sendToBasket } from '../../../utils/function';
import { AuthContext } from '../../../App';
import { observer } from 'mobx-react-lite';
import $api from '../../../utils/AxiosInterceptors';
import SucessModal from '../Modals/SucessModal/SucessModal';
import { settings } from '../../../utils/object';
import changeButton from '../../../img/change.png'
import { advtMainCritBackST, advtMainCritBooleanST, advtMainCritFrontST, advtMainCritSearchBackST, errorValidatorCreateAdvert } from '../../../utils/useStateObjects';
import InputFromDB from '../Inputs/InputFromDB/InputFromDB';
import DopSettingsList from '../Lists/DopSettingsList/DopSettingsList';
import InputFromDopSettings from '../Inputs/InputFromDopSettings/InputFromDopSettings';
import ExitButton from '../buttons/ExitButton/ExitButton';
import { useRef } from 'react';
import close from '../../../img/close.png'
import doctor from '../../../img/doctor.gif'
import InputFileMultiple from '../Inputs/InputFileMultiple/InputFileMultiple';
import ErrorDiv from '../errors/ErrorDiv/ErrorDiv';
import InputWithErrorCorrect from '../Inputs/InputWithErrorCorrect/InputWithErrorCorrect';
import UniversalModal from '../Modals/UniversalModal/UniversalModal';
import SuperUniversalModal from '../Modals/SuperUniversalModal/SuperUniversalModal';
import CreateReportModal from '../Modals/CreateReportModal/CreateReportModal';

const BigItem = ({ paramID, advt, myadvert, changeModal, setChangedModal, fromItemAdvt, setfromItemAdvt }) => {


  // * ХУКИ 
  const slider = useRef()
  const modalRef = useRef()
  const { store } = useContext(AuthContext)
  const navigate = useNavigate()
  const [visibleReportModal, setVisibleReportModal] = useState(false)
  const [visibleModalAuth, setVisibleModalAuth] = useState(false)
  const [advert, setAdvert] = useState({})
  const [basketCheck, setBasketCheck] = useState(false)
  const [searchOptionBack, setSearchOptionBack] = useState(advtMainCritSearchBackST)
  const [searchOptionFrontSAVED, setSearchOptionFrontSAVED] = useState(advtMainCritFrontST)
  const [searchOptionFront, setSearchOptionFront] = useState(advtMainCritFrontST)
  const [searchOptionBoolean, setFrontSearchBoolean] = useState(advtMainCritBooleanST)
  const [errorValidator, setErrorValidator] = useState({ ...errorValidatorCreateAdvert, save: errorValidatorCreateAdvert });
  const [notDownPic, setNotDownPic] = useState([])
  const [deletedPic, setDeletedPic] = useState([])

  useEffect(() => {
    getAdvert(paramID, store.user.id, myadvert)
  }, [])

  useEffect(() => {
    // ! При клике на изменение объявления скроллит до этого модального окна
    if (modalRef.current) {
      setTimeout(() => {
        modalRef.current.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])
  // * ______________________________________________________________________________________________________________________

  // ! Функции 

  const sendSearchOption = async (searchOptionView, criterieSetting, changedSearch, advertF) => {
    if (changedSearch == true) {
      searchOptionView = { ...searchOptionView, [criterieSetting]: changedSearch }
      await $api.post('/advertisments', searchOptionView)
        .then(res => {
          setFrontSearchBoolean({ ...searchOptionBoolean, [criterieSetting]: changedSearch })
          setSearchOptionFront({ ...searchOptionFront, ...res.data })
          setSearchOptionFrontSAVED({ ...searchOptionFront, ...res.data })
        })
    } else {
      searchOptionView = { ...searchOptionView, [criterieSetting]: changedSearch }
      await $api.post('/advertisments', searchOptionView)
        .then(res => {
          if (advertF) {
            var errors = {}
            var stDops = res.data.dopSettings.map(st => {
              errors = { ...errors, [st.subcategory]: '' }
              if (advertF.dopSettings.findIndex(set => set.subcategory == st.subcategory) != -1) {
                let idx = advertF.dopSettings.findIndex(set => set.subcategory == st.subcategory)
                return { ...st, ...advertF.dopSettings[idx] }
              } else {
                return st
              }
            })
            setAdvert({ ...advertF, dopSettings: stDops });
            setErrorValidator({ ...errorValidatorCreateAdvert, ...errors, save: { ...errorValidatorCreateAdvert, ...errors } })
          }
          setFrontSearchBoolean({ ...searchOptionBoolean, dopSettings: true })
          setSearchOptionFront({ ...searchOptionFront, ...res.data })
          setSearchOptionFrontSAVED({ ...searchOptionFront, ...res.data })
        })
    }
  }

  const fnBasketCheck = (advert_id, user_id, basketCheck) => {
    if (user_id && basketCheck) {
      // !  УБРАТЬ ИЗ КОРЗИНЫ АВТ ПОЛЬЗ Объявление
      removeToBasket(advert_id).then(res => {
        setBasketCheck(!basketCheck);
        store.getBasketCount()
      })
    } else if (user_id && basketCheck == false) {
      // !  ДОБАВИТЬ В КОРЗИНУ АВТ ПОЛЬЗ
      sendToBasket(advert_id).then(res => {
        setBasketCheck(!basketCheck);
        store.getBasketCount()
      })
    } else if (user_id == undefined) {
      // !  Пользователь не авторизован ,поэтому при клике на корзину АВТОРИЗУЙСЯ СУКА
      setVisibleModalAuth(true)
    }
  }

  const getAdvert = async (paramID, user_id) => {
    if (myadvert == undefined) {
      console.log('FARIDA')
      await axios.get(`/advertisments/${paramID}`)
        .then(res => { setAdvert(res.data) })
    } else {
      // ! Если я сюда зашёл,то это значит что я зашёл в своё объявление через страницу MyAdvertPage(Объявления)
      await axios.get(`/advertisments/${paramID}`)
        .then(res => {
          let dopset = {}
          for (let i = 0; i < res.data.dopSettings.length; i++) {
            console.log(typeof (res.data.dopSettings[i].unit) === 'object')
            if (typeof (res.data.dopSettings[i].unit) === 'object') {
              dopset = { ...dopset, [res.data.dopSettings[i].subcategory]: res.data.dopSettings[i].value }
            }
          }
          sendSearchOption({}, 'category', res.data.category, { ...res.data, ...dopset })
        })
    }
    if (user_id) {
      // ! Если я сюда зашёл ,значит я авторизован ,поэтому у меня и есть корзина 
      await $api.get(`/basketBigItem/${paramID}`).then(res => setBasketCheck(res.data))
    }
  }

  const previewPic = (pictures) => {
    let newPic = []
    for (let i = 0; i < pictures.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(pictures[i]);
      reader.onloadend = function () {
        let picture = { id: pictures[i].lastModified, path: reader.result, name: pictures[i].name };
        newPic = [picture, ...newPic]
        setAdvert({ ...advert, pictures: [...newPic, ...advert.pictures] })
      }
    }
  }

  const updateAdvert = async (advertWithMainSettings, pic = [], deletedPic = []) => {

    // ! Отфильтровал из фото с объявления превьюшые фото ,ктр не загружены в бэк
    advertWithMainSettings.pictures.filter(pic => pic.id < 10000000)
    // ! ______________________________________________________________________________________________

    // ? Создание массива доп настроек ктр будут отправлены в бэк
    let dopSettings = [...advertWithMainSettings.dopSettings]
    // !  dopSettings = Сейчас массив со всеми доп.настройками. 
    // ! Циклом я заменяю значения кнопочные(не числовые) в этом массиве 
    for (let i = 12; i < Object.keys(advertWithMainSettings).length; i++) {
      console.log(Object.keys(advertWithMainSettings)[i])
      let idx = dopSettings.findIndex(dopS => dopS.subcategory == Object.keys(advertWithMainSettings)[i])
      dopSettings.splice(idx, 1, { ...advertWithMainSettings.dopSettings[idx], value: Object.values(advertWithMainSettings)[i] })
    }
    // ! ______________________________________________________________________________________________


    let advert = new FormData();
    for (let i = 0; i < pic.length; i++) {
      advert.append('pictures', pic[i])
    }
    advert.append('advertWithMainSettings', JSON.stringify(advertWithMainSettings));
    advert.append('dopSettings', JSON.stringify(dopSettings));
    advert.append('deletePic', JSON.stringify(deletedPic));
    await axios.put(`/updateAdvertisments/${advertWithMainSettings.advt_id}`, advert, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    }).then(res => {

      // ! При удачном заходе обновления сбрасываю ошибки,ибо их больше нет
      setErrorValidator({ ...errorValidator.save, save: errorValidator.save })
      // ! ______________________________________________________________________________________________

      // ? ХЗ для чего использовал
      /*
      for (let i = 0; i < Object.keys(dopSettings).length; i++) {
        let idx = advertWithMainSettings.dopSettings.findIndex(dopS => dopS.subcategory == Object.keys(dopSettings)[i])
        advertWithMainSettings.dopSettings[idx] = {
          ...advertWithMainSettings.dopSettings[i],
          value: Object.values(dopSettings)[idx]
        }
      }
      */
      // ? ______________________________________________________________________________________________

      console.log(advertWithMainSettings.dopSettings)
      // ! Обновил доп.настройки которые идут в item (MyadvertPage )
      // ! Отфилтровал те значения ,которые сброшеы были или значение изначально было пустым(undefined)
      let filteredDopsToItem = res.data.filter(dopS => dopS.value != undefined && dopS.value != '')
      console.log(advertWithMainSettings.dopSettings)
      setfromItemAdvt({ ...advertWithMainSettings, dopSettings: filteredDopsToItem })
      // ! ______________________________________________________________________________________________
    })
      .catch(res => {
        // ! На каждом неудачном заходе обновления сбрасываю ошибки,чтобы можно было добавить/видеть только актуальные ошибки
        setErrorValidator({ ...errorValidator.save, ...res.response.data.erros })
      })
  }




  if (myadvert) {
    // ! Если я сюда зашёл,то это значит что я зашёл в своё объявление через страницу MyAdvertPage(Объявления)
    if (advert != {}) {
      return <div ref={modalRef} className={classes.backGroundTech}>
        <div className="buttons">
          <div className={classes.cont_flex_rigt}>
            <ExitButton id={classes.blackButton} onClick={e => { updateAdvert(advert, notDownPic, deletedPic) }} textContent={'Сохранить изменения'} />
            <ExitButton id={classes.blackButton} onClick={e => setChangedModal({ ...changeModal, changeModal: false })} textContent={'Закрыть окно'} />
          </div>
        </div>
        <div className={classes.bigItem}>
          <div className="left_side">
            <div className={classes.info}>
              <InputWithErrorCorrect
                customClass={classes.inputFromDopSettings}
                value={advert.title ? advert.title : ''}
                valueError={errorValidator.title}
                onChange={e => setAdvert({ ...advert, title: e.target.value })} />
              <h6>{advert.create_at ? makeNormalDateAndTime(advert.create_at) : ''}</h6>
            </div>
            <Slider ref={slider} className={classes.slider} {...settings}>
              {Array.isArray(advert.pictures) == false
                ? ''
                : advert.pictures.length > 0
                  ? advert.pictures.map(item => {
                    console.log(item)
                    return <div key={item.id} className={classes.picture}>
                      <img src={item.path} />
                      <img id={classes.cancelBtn} src={close}
                        onClick={e => { // setDeletedPic
                          console.log(item)
                          let pictures = removeItemFromArray(item, 'id', advert.pictures);
                          if (item.id < 10000000) {
                            setDeletedPic([...deletedPic, item])
                          }
                          setNotDownPic(removeItemFromArray(item, 'name', notDownPic))
                          setAdvert({ ...advert, pictures })
                        }} />
                    </div>
                  })
                  : <div className={classes.colWithoutPic}>
                    <h3>Без фото нет допуска</h3>
                    <img src={doctor} />
                    <ErrorDiv value={errorValidator.pictures} />
                  </div>
              }
            </Slider>
            <div className="download_pic">
              <InputFileMultiple
                type='file'
                accept=".jpg, .jpeg, .png"
                name="filefield"
                items={notDownPic}
                onChange={e => { setNotDownPic([...e.target.files, ...notDownPic]); previewPic(e.target.files) }}
              />
            </div>
          </div>
          <div className="right_side left_side">
            <div className={classes.center}>
              <div className={advert.dopSettings && advert.dopSettings.length > 0 ? classes.tech : 'off'}>
                <div className="left_side ">
                  {advert.dopSettings && advert.dopSettings.length > 0
                    ? <DopSettingsList id={classes.colorWhite}>
                      {advert.dopSettings.map((set, idx) => {
                        if (set.unit == null) {
                          console.log('СТРОКА')
                          console.log(set)
                          return <div key={set.id}>
                            <p> {set.subcategory}  {set.unit ? `- ${set.unit}` : ''}</p>
                            <InputFromDB
                              id={classes.inputFromDBInDop}
                              criterieSetting={set.subcategory}
                              sendSearchOption={sendSearchOption}
                              searchOptionBack={advert} setSearchOptionBack={setAdvert}
                              searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
                              searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
                              searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
                              error={errorValidator[set.subcategory]}
                            />
                          </div>
                        } else {
                          console.log(set);
                          return <InputWithErrorCorrect key={set.id} valueError={errorValidator[set.subcategory]}>
                            <p> {set.subcategory}  {set.unit ? `- ${set.unit}` : ''}</p>
                            <input
                              value={set.value ? set.value : ''}
                              onChange={e => {
                                let stDops = advert.dopSettings.filter(st => st.subcategory != set.subcategory)
                                console.log(stDops)
                                stDops.splice(idx, 0, { ...set, value: e.target.value, })
                                setAdvert({ ...advert, dopSettings: stDops })
                              }} />
                          </InputWithErrorCorrect>

                        }
                      }

                      )}
                    </DopSettingsList>
                    : ''}
                </div>
              </div>
              <div className={classes.location}>
                <h5>Цена</h5>
                <InputWithErrorCorrect
                  customClass={classes.inputFromDopSettings}
                  value={advert.cost ? convertMoneyTo1000(advert.cost) : 'Не указана'}
                  valueError={errorValidator.cost}
                  onChange={e => setAdvert({ ...advert, cost: e.target.value })} />
              </div>
              <div className={classes.location}>
                <h5>Пробег</h5>
                <InputWithErrorCorrect
                  customClass={classes.inputFromDopSettings}
                  value={advert.mileage ? advert.mileage : 'Не указана'}
                  valueError={errorValidator.mileage}
                  onChange={e => setAdvert({ ...advert, mileage: e.target.value })} />
              </div>
              <div className={classes.location}>
                <h5>Расположение</h5>
                <InputFromDopSettings
                  value={advert.location ? advert.location : 'Не указано'}
                  onChange={e => setAdvert({ ...advert, location: e.target.value })} />
              </div>
              <BigAdvertButton
                // onClick={e => console.log("BAH")}
                id={basketCheck ? classes.inBasket : ''}
                textContent={basketCheck ? 'В избранном' : 'Избранное'}
                onClick={e => {
                  fnBasketCheck(advert.advt_id, store.user.id, basketCheck)
                }
                } />
            </div>
          </div>
          <div className={classes.exposition}>
            <h3>Описание</h3>
            <textarea type={'text'}
              className={classes.inputWithoutCheck}
              value={advert.exposition ? advert.exposition : 'Описание отсутствует'}
              onChange={e => setAdvert({ ...advert, exposition: e.target.value })} />

          </div>
          <SucessModal
            visible={visibleModalAuth}
            setVisible={setVisibleModalAuth}
            textContent={'Необходимо авторизоваться'} />
        </div>
      </div>
    }
  }


  return (
    <div className={classes.bigItem}>
      <div className="left_side">
        <div className={classes.info}>
          <h3>{advert.title}</h3>
          <h6>{advert.create_at ? makeNormalDateAndTime(advert.create_at) : ''}</h6>
        </div>
        <Slider className={classes.slider} {...settings}>
          {advert.pictures != undefined
            ? advert.pictures.map(item => {
              return <div key={item.id} className={classes.picture}>
                <img src={item.path} />
              </div>
            })
            : ''
          }
        </Slider>
      </div>
      <div className="right_side left_side">
        <h4 onClick={e => {
          if (advert.user_id == store?.user?.id) {
            navigate(`/profile`)
          } else { navigate(`/profile/${advert.user_id}`) }
        }}>{advert.user_login}</h4>
        {advert.user_id != store?.user?.id
          ? <MoreButton
            onClick={e => {
              if (store.isAuth) { navigate(`/chat/${advert.user_id}`) } else {
                setVisibleModalAuth(true)
              }
            }}
            textContent={'Написать'} />
          : ''}
        <div className={classes.center}>
          <div className={advert.dopSettings && advert.dopSettings.length > 0 ? classes.tech : 'off'}>
            <div className="left_side">
              {advert.dopSettings && advert.dopSettings.length > 0
                ? advert.dopSettings.map(set => <h5 key={set.subcategory}>
                  {set.subcategory}
                </h5>)
                : ''}
            </div>
            <div className="right_side">
              {advert.dopSettings && advert.dopSettings.length > 0
                ? advert.dopSettings.map(set => <h5 key={set.subcategory}>
                  {set.value} {set.unit ? set.unit : ''}
                </h5>)
                : ''}
            </div>
          </div>
          <div className={classes.tech}>
            <div className="left_side">
              <h4>Цена</h4>
            </div>
            <div className="right_side">
              <h4>{advert.cost ? convertMoneyTo1000(advert.cost) : 'Не указана'}</h4>
            </div>
          </div>
          <div className={classes.location}>
            <h5>Расположение</h5>
            <h5>{advert.location ? advert.location : 'Не указано'}</h5>
          </div>
          <BigAdvertButton
            // onClick={e => console.log("BAH")}
            id={basketCheck ? classes.inBasket : ''}
            textContent={basketCheck ? 'В избранном' : 'Избранное'}
            onClick={e => {
              fnBasketCheck(advert.advt_id, store.user.id, basketCheck)
            }
            } />
          <ProfileButton textContent={'Пожаловаться'} onClick={e => setVisibleReportModal(!visibleReportModal)} />
        </div>
      </div>
      <div className={classes.exposition}>
        <h3>Описание</h3>
        <p>{advert.exposition ? advert.exposition : 'Описание отсутствует'}</p>
      </div>
      <SucessModal
        visible={visibleModalAuth}
        setVisible={setVisibleModalAuth}
        textContent={'Необходимо авторизоваться'} />
      <CreateReportModal visible={visibleReportModal} setVisible={setVisibleReportModal} intruder_login={advert.user_login} />
    </div>

  )

} //user_login

export default observer(BigItem)

