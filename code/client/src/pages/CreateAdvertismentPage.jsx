import React, { useContext, useState } from 'react'
import UniversalModal from '../components/UI/Modals/UniversalModal/UniversalModal'
import classes from './imgPages/CreateAdvertismentPage.module.css'
import reset from '../img/reset.png'
import ExitButton from '../components/UI/buttons/ExitButton/ExitButton'
import ErrorDiv from '../components/UI/errors/ErrorDiv/ErrorDiv'
import axios from 'axios'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import close from '../img/close.png'
import $api from '../utils/AxiosInterceptors'
import { removeItemFromArray, useInputLag } from '../utils/function'
import InputFromDB from '../components/UI/Inputs/InputFromDB/InputFromDB'
import { AuthContext } from '../App'
import { advtMainCritBackST, advtMainCritFrontST, advtMainCritBooleanST, errorValidatorCreateAdvert } from '../utils/useStateObjects'
import { useNavigate } from 'react-router-dom'
import SucessModal from '../components/UI/Modals/SucessModal/SucessModal'
import { CSSTransition } from 'react-transition-group'
import DopSettingsList from '../components/UI/Lists/DopSettingsList/DopSettingsList'
import InputWithErrorCorrect from '../components/UI/Inputs/InputWithErrorCorrect/InputWithErrorCorrect'
import InputFileMultiple from '../components/UI/Inputs/InputFileMultiple/InputFileMultiple'
import { settings } from '../utils/object'



const CreateAdvertismentPage = () => {


  // * *****************************************
  // ? ХУКИ
  const navigate = useNavigate()
  const { store } = useContext(AuthContext)
  const [searchOptionBack, setSearchOptionBack] = useState(advtMainCritBackST)
  const [expostion, setExposition] = useState('')
  const [searchOptionFrontSAVED, setSearchOptionFrontSAVED] = useState(advtMainCritFrontST)
  const [searchOptionFront, setSearchOptionFront] = useState(advtMainCritFrontST)
  const [searchOptionBoolean, setFrontSearchBoolean] = useState(advtMainCritBooleanST)
  const [errorValidator, setErrorValidator] = useState({ ...errorValidatorCreateAdvert, save: '' });
  const [searchOptionDOPFrontSAVED, setSearchOptionDOPFrontSAVED] = useState({})
  const [authError, setAuthError] = useState(false)
  const [pictures, setPictures] = useState([])
  const [preview, setPreview] = useState([])
  // * *****************************************

  // * *****************************************
  // ? Функции
  const writeExposition = (text, back, setBack) => {
    setBack({ ...back, exposition: text })
  }
  const previewPic = (pictures) => {
    let newPic = []
    for (let i = 0; i < pictures.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(pictures[i]);
      reader.onloadend = function () {
        let picture = { id: pictures[i].lastModified, path: reader.result, name: pictures[i].name };
        console.log(picture)
        newPic = [picture, ...newPic]
        setPreview([...newPic, ...preview])
      }
    }
  }
  const writeExpositionWithLag = useInputLag(writeExposition, 1000)
  const createAdvert = async (advertWithMainSettings, pic) => {

    console.log(advertWithMainSettings)
    console.log(advertWithMainSettings.dopSettings)
    console.log(pic)
    let dopSettings = []
    console.log(Object.keys(advertWithMainSettings).length)
    for (let i = 0; i < advertWithMainSettings.dopSettings.length; i++) {
      console.log(advertWithMainSettings.hasOwnProperty([advertWithMainSettings.dopSettings[i].subcategory]) == false)
      if (advertWithMainSettings.hasOwnProperty([advertWithMainSettings.dopSettings[i].subcategory]) == false) {
        console.log(advertWithMainSettings.dopSettings[i])
        dopSettings = [...dopSettings, advertWithMainSettings.dopSettings[i]]
      }
      //    ...advertWithMainSettings.dopSettings[idx], value: Object.values(advertWithMainSettings)[i] }
      //dopSettings = [...dopSettings, { ...advertWithMainSettings[i], value: Object.values(advertWithMainSettings)[i] }]
    }
    console.log(dopSettings)
    for (let i = 8; i < Object.keys(advertWithMainSettings).length; i++) {
      console.log(Object.keys(advertWithMainSettings)[i])
      let idx = advertWithMainSettings.dopSettings.findIndex(dopS => dopS.subcategory == Object.keys(advertWithMainSettings)[i])
      console.log(idx)
      dopSettings = [...dopSettings, { ...advertWithMainSettings.dopSettings[idx], value: Object.values(advertWithMainSettings)[i] }]
    }
    dopSettings = dopSettings.sort((a, b) => a['id'] - b['id'])
    console.log(dopSettings)
    let advert = new FormData();
    for (let i = 0; i < pic.length; i++) {
      advert.append('pictures', pic[i])
    }
    advert.append('advertWithMainSettings', JSON.stringify(advertWithMainSettings));
    advert.append('dopSettings', JSON.stringify(dopSettings));
    await axios.post('/createAdvertisments', advert, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .catch(res => {
        if (res.response.status == 401) {
          setAuthError(true)
        }
        setErrorValidator({ errorValidatorCreateAdvert, ...res.response.data.erros })
        console.log('FFFF')
        console.log({ errorValidatorCreateAdvert, ...res.response.data.erros })

      }).then(res => {
        console.log('erra')
        if (res != undefined) {
          setAuthError(false)
          navigate(`/advertisment/${res.data}`)
        }
      })
  }

  const sendSearchOption = async (searchOptionView, criterieSetting, changedSearch) => {
    console.log(changedSearch)
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
          console.log('КАТЕ')
          setFrontSearchBoolean({ ...searchOptionBoolean, dopSettings: true })
          setSearchOptionFront({ ...searchOptionFront, ...res.data })
          setSearchOptionFrontSAVED({ ...searchOptionFront, ...res.data })
          let errors = {}
          res.data.dopSettings.forEach(dopS => errors = { ...errors, [dopS.subcategory]: '' })
          let d = res.data.dopSettings.forEach(dopS => errors = { ...errors, [dopS.subcategory]: '' })
          console.log(errors)
          setErrorValidator({ ...errorValidatorCreateAdvert, ...errors })
        })
    }
  }
  // * *****************************************


  console.log(searchOptionBack)
  console.log(searchOptionFront)
  console.log(searchOptionDOPFrontSAVED)
  console.log(errorValidator)


  return (
    <div className={classes.createAdvertismentPage}>
      <SucessModal visible={authError} setVisible={setAuthError} textContent={'Авторизуйтесь'} />
      <UniversalModal visible={true} id={classes.paddingTop40px}>
        <div className={classes.flexToEnd}>
          <ExitButton
            id={classes.pos_saveChanges}
            onClick={e => createAdvert({ dopSettings: searchOptionFront?.dopSettings ? searchOptionFront?.dopSettings : [], ...searchOptionBack }, pictures)}
            textContent={'Создать объявление'} />
          <button
            onClick={e => {
              setSearchOptionBack(advtMainCritBackST)
              setFrontSearchBoolean(advtMainCritBooleanST)
              setSearchOptionFront(advtMainCritFrontST)
              setSearchOptionFrontSAVED(advtMainCritFrontST)
              setAuthError(false)
              setErrorValidator(errorValidatorCreateAdvert)
            }}
            className={classes.reset}><img src={reset} />
          </button>
        </div>

        <div className={classes.modalTop}>
          <div className={classes.key}>
            <input readOnly placeholder='Категория' />
            <input readOnly placeholder='Бренд' />
            <input readOnly placeholder='Название машины' />
            <input readOnly placeholder='Цена' />
            <input readOnly placeholder='Пробег' />
            <input readOnly placeholder='Расположение' />
            <input readOnly placeholder='Фото' />
          </div>
          <div className={classes.value}>
            <InputFromDB
              criterieSetting={'category'}
              sendSearchOption={sendSearchOption}
              searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
              searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
              searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
              searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
              error={errorValidator.category}
            />
            <InputFromDB
              criterieSetting={'brand'}
              sendSearchOption={sendSearchOption}
              searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
              searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
              searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
              searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
              error={errorValidator.brand}
            />
            <InputWithErrorCorrect
              value={searchOptionBack.title}
              valueError={errorValidator.title}
              onChange={e => setSearchOptionBack({ ...searchOptionBack, title: e.target.value })}
            />
            <InputWithErrorCorrect
              value={searchOptionBack.cost}
              valueError={errorValidator.cost}
              onChange={e => setSearchOptionBack({ ...searchOptionBack, cost: e.target.value })}
            />
            <InputWithErrorCorrect
              value={searchOptionBack.mileage}
              valueError={errorValidator.mileage}
              onChange={e => setSearchOptionBack({ ...searchOptionBack, mileage: e.target.value })}
            />
            <InputWithErrorCorrect
              value={searchOptionBack.location}
              valueError={errorValidator.mileage}
              onChange={e => setSearchOptionBack({ ...searchOptionBack, location: e.target.value })}
            />

            <div
              className={classes.boxValue} id={classes.mxWidth215px}>
              <InputFileMultiple
                type='file'
                accept=".jpg, .jpeg, .png"
                name="filefield"
                items={pictures}
                onChange={e => { setPictures([...pictures, ...e.target.files]); previewPic(e.target.files) }}
              />
              <ErrorDiv value={errorValidator.pictures} className={classes.errorDivClass} />
            </div>
          </div>
        </div>
        <Slider className={classes.slider} {...settings}>
          {preview.length > 0
            ? preview.map(item => {
              console.log(item)
              return <div key={item.id} className={classes.picture}>
                <img src={item.path} />
                <img id={classes.cancelBtn} src={close}
                  onClick={e => { // setDeletedPic
                    console.log(item)
                    let previewPic = removeItemFromArray(item, 'name', preview);
                    let picturesFromInput = removeItemFromArray(item, 'name', pictures);
                    setPictures(picturesFromInput)
                    setPreview(previewPic)
                    // setNotDownPic(removeItemFromArray(item, 'name', notDownPic))
                    // setAdvert({ ...advert, pictures })
                  }} />
              </div>
            })
            : ''
          }
        </Slider>
        <CSSTransition id={classes.center} in={searchOptionBoolean.dopSettings} timeout={300} classNames="alert" unmountOnExit>
          <div className="">
            <h5 id={classes.colorRed}>Для эффективтовного поиска по доп.характеристикам необходимо указать все поля техники.</h5>
            {Array.isArray(searchOptionFront.dopSettings)
              ?
              <DopSettingsList id={classes.colorWhite}>
                {searchOptionFront.dopSettings.map(set => {
                  if (set.subcategorytype == 'string') {
                    console.log('СТРОКА')
                    return <div key={set.id}>
                      <p> {set.subcategory}  {set.unit ? `- ${set.unit}` : ''}</p>
                      <InputFromDB
                        id={classes.inputFromDBInDop}
                        criterieSetting={set.subcategory}
                        sendSearchOption={sendSearchOption}
                        searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
                        searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
                        searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
                        searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
                        error={errorValidator[set.subcategory]}
                      />
                    </div>
                  } else {
                    return <InputWithErrorCorrect key={set.id} valueError={errorValidator[set.subcategory]}>
                      <p> {set.subcategory}  {set.unit ? `- ${set.unit}` : ''}</p>
                      <input onChange={e =>
                        setSearchOptionBack({ ...searchOptionBack, [set.subcategory]: e.target.value })} />
                    </InputWithErrorCorrect>
                  }
                }

                )}
              </DopSettingsList>
              : ''
            }
          </div>
        </CSSTransition>

        <div className={classes.modalBottom}>
          <h3>Описание</h3>
          <textarea type={'text'}
            className={classes.inputWithoutCheck}
            onChange={e => {
              setExposition(e.target.value);
              writeExpositionWithLag(e.target.value, searchOptionBack, setSearchOptionBack)
            }}
            value={expostion} />
        </div>
      </UniversalModal>
    </div>
  )
}

export default CreateAdvertismentPage