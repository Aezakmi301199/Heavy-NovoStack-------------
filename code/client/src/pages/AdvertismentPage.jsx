import React, { useContext, useEffect, useState } from 'react'
import classes from './imgPages/AdvertisementPage.module.css'
import dots from '../img/dots.svg'
import { CSSTransition } from 'react-transition-group'
import '../App.css'
import Item from '../components/UI/Item/Item'
import MoreButton from '../components/UI/buttons/MoreButton/MoreButton'
import axios from 'axios'
import { makeNormalDateAndTime } from '../utils/function'
import { advtMainCritBooleanST, advtMainCritFrontST, advtMainCritSearchBackST, errorValidatorCreateAdvert } from '../utils/useStateObjects'
import InputFromDB from '../components/UI/Inputs/InputFromDB/InputFromDB'
import $api from '../utils/AxiosInterceptors'
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import BigAdvertButton from '../components/UI/buttons/BigAdverButton/BigAdvertButton'
import searchPic from '../img/search2.png'
import DopSettingsList from '../components/UI/Lists/DopSettingsList/DopSettingsList'
import FromToSlider from '../components/UI/FromToSlider/FromToSlider'
import { useParams } from 'react-router-dom'
const AdvertisementPage = () => {

     const params = useParams()
     // **********************************************************************************************
     // ? ХУКИ
     const [category, setCategory] = useState(false)
     const [advert, setAdvert] = useState([])
     const [searchOptionBack, setSearchOptionBack] = useState(advtMainCritSearchBackST)
     const [searchOptionFrontSAVED, setSearchOptionFrontSAVED] = useState(advtMainCritFrontST)
     const [searchOptionFront, setSearchOptionFront] = useState(advtMainCritFrontST)
     const [searchOptionBoolean, setFrontSearchBoolean] = useState(advtMainCritBooleanST)
     const [errorValidator, setErrorValidator] = useState({ errorValidatorCreateAdvert });

     useEffect(() => { getAdvert() }, [])
     // **********************************************************************************************

     // **********************************************************************************************
     // ? ФУНКЦИИ
     const filterAdvert = async (searchOptionBack, dopSettings = []) => {
          console.log(searchOptionBack)
          console.log(dopSettings)
          if (searchOptionBoolean.dopSettings != false) {
               for (let i = 8; i < Object.keys(searchOptionBack).length; i++) {
                    let index = dopSettings.findIndex(dop => dop.subcategory == Object.keys(searchOptionBack)[i])
                    dopSettings.splice(index, 1, {
                         subcategorytype: dopSettings[index].subcategorytype,
                         id: dopSettings[index].id,
                         subcategory: Object.keys(searchOptionBack)[i],
                         value: Object.values(searchOptionBack)[i]
                    })
               }
          }
          await axios.post('/filteredAdvert', { mainSettings: searchOptionBack, dopSettings }).then(res => setAdvert(res.data))
     }
     const sendSearchOption = async (searchOptionView, criterieSetting, changedSearch) => {
          if (criterieSetting == undefined) {
               let newOptionBack = {}
               let key = Object.keys(searchOptionBack)
               let value = Object.values(searchOptionBack)
               for (let i = 0; i < 8; i++) {
                    newOptionBack = { ...newOptionBack, [key[i]]: value[i] }
               }
               setSearchOptionBack(newOptionBack)
               setSearchOptionFront(searchOptionFrontSAVED)
               return
          }
          else if (searchOptionBack.dopSettings) {
               searchOptionView = { ...searchOptionView, [criterieSetting]: changedSearch }
               await $api.post('/advertisments', searchOptionView)
                    .then(res => {
                         setFrontSearchBoolean({ ...searchOptionBoolean, [criterieSetting]: true })
                         setSearchOptionFront({ ...searchOptionFront, ...res.data })
                    })
               return
          }
          else if (changedSearch == true) {
               searchOptionView = { ...searchOptionView, [criterieSetting]: changedSearch }
               await $api.post('/advertisments', searchOptionView)
                    .then(res => {
                         setFrontSearchBoolean({ ...searchOptionBoolean, [criterieSetting]: changedSearch })
                         setSearchOptionFront({ ...searchOptionFront, ...res.data })
                         if (searchOptionFront.category.length == 0) {
                              setSearchOptionFrontSAVED({ ...searchOptionFrontSAVED, ...res.data })
                         }
                         return
                    })
          } else if (searchOptionFront.dopSettings == undefined || (searchOptionBack.category != '' && criterieSetting == 'category')) {
               searchOptionView = { ...advtMainCritSearchBackST, [criterieSetting]: changedSearch }
               setSearchOptionBack({ ...advtMainCritSearchBackST, [criterieSetting]: changedSearch })
               await $api.post('/advertisments', searchOptionView)
                    .then(res => {
                         setFrontSearchBoolean({ ...searchOptionBoolean, dopSettings: true })
                         setSearchOptionFront({ ...searchOptionFront, ...res.data })
                         setSearchOptionFrontSAVED({ ...searchOptionFront, ...res.data })
                    })
               return
          } else {
               console.log('asssasin')
               searchOptionView = { ...searchOptionView, [criterieSetting]: changedSearch }
               await $api.post('/advertisments', searchOptionView)
                    .then(res => {
                         setSearchOptionFront({ ...res.data })
                         setFrontSearchBoolean({ ...searchOptionBoolean, dopSettings: true })
                    })
          }
     }
     const getAdvert = async () => {
          await axios.get('/advertisments').then(res => { setAdvert(res.data); console.log(res.data) })
     }

     // **********************************************************************************************

     useEffect(() => {
          if (params?.category) {
               setCategory(!category)
               let categoryFromMainPage = params.category
               console.log(`MAIN PAG ${categoryFromMainPage}`)
               setSearchOptionBack({ ...searchOptionBack, category: categoryFromMainPage })
               sendSearchOption(searchOptionFront, 'category', categoryFromMainPage)
          }
     }, [])




     return (
          <div className={classes.advertisment}>
               <div className={classes.searchCategory} id={category == false ? '' : classes.colorInherit}>
                    <InputFromDB
                         id={category == false ? classes.inputSearch : 'off'}
                         criterieSetting={'category'}
                         sendSearchOption={sendSearchOption}
                         searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
                         searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
                         searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
                         searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
                         error={errorValidator.category}>
                         <img src={searchPic}
                              onClick={e => { e.preventDefault(); filterAdvert(searchOptionBack, searchOptionFront.dopSettings) }} />
                    </InputFromDB>

                    <button onClick={e => setCategory(!category)} id={classes.dotsButton}><img src={dots} id={classes.dots} /></button>
               </div>
               <CSSTransition in={category} timeout={300} classNames="alert" unmountOnExit>
                    <div className={classes.searchOption}>
                         <div className={classes.category}>
                              <div className={classes.boxValue}>
                                   <h5>Категория</h5>
                                   <InputFromDB
                                        id={classes.buttonStyleSelect}
                                        criterieSetting={'category'}
                                        sendSearchOption={sendSearchOption}
                                        searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
                                        searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
                                        searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
                                        searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
                                        error={errorValidator.category}
                                   />
                              </div>
                              <div className={classes.boxValue}>
                                   <h5>Бренд</h5>
                                   <InputFromDB
                                        id={classes.buttonStyleSelect}
                                        criterieSetting={'brand'}
                                        sendSearchOption={sendSearchOption}
                                        searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
                                        searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
                                        searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
                                        searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
                                        error={errorValidator.category}
                                   />
                              </div>
                              <div className={classes.boxValue}>
                                   <h5>Стоимость</h5>
                                   <div className={classes.cost}>
                                        <div className={classes.slider}>
                                             <Slider
                                                  range
                                                  marks={{
                                                       100: `${searchOptionBack.cost.min}т.`,
                                                       10000: `${searchOptionBack.cost.max}т.`
                                                  }}
                                                  min={100}
                                                  max={10000}
                                                  tipFormatter={value => `$ ${value}`}
                                                  tipProps={{
                                                       placement: "top",
                                                       visible: true
                                                  }}
                                                  defaultValue={[searchOptionBack.cost.min, searchOptionBack.cost.max]}
                                                  onChange={e => {
                                                       console.log(e);
                                                       setSearchOptionBack({ ...searchOptionBack, cost: { min: e[0], max: e[1] } })
                                                  }}
                                             />
                                        </div>
                                   </div>

                              </div>
                              <FromToSlider
                                   id={classes.marginTop2px}
                                   textContent={'Пробег'}
                                   onChangeStart={e => setSearchOptionBack({ ...searchOptionBack, mileage: { ...searchOptionBack.mileage, min: e.target.value } })}
                                   onChangeFinish={e => setSearchOptionBack({ ...searchOptionBack, mileage: { ...searchOptionBack.mileage, max: e.target.value } })}
                              />
                              <div className="">
                                   {Array.isArray(searchOptionFront.dopSettings)
                                        ?
                                        <DopSettingsList id={classes.r3}>
                                             {searchOptionFront.dopSettings.map((set, idx) => {
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
                                                       let min = set.min
                                                       let max = set.max
                                                       return <div key={set.id}>
                                                            <p>{set.subcategory}</p>
                                                            <Slider id={classes.r2}
                                                                 range
                                                                 marks={{
                                                                      [min]: `${set.min} ${set.unit} `,
                                                                      [max]: `${set.max} ${set.unit} `
                                                                 }}
                                                                 min={searchOptionFrontSAVED.dopSettings[idx].min}
                                                                 max={searchOptionFrontSAVED.dopSettings[idx].max}
                                                                 tipProps={{
                                                                      placement: "top",
                                                                      visible: true

                                                                 }}
                                                                 defaultValue={[set.min, set.max]}
                                                                 onChange={e => {
                                                                      let stDops = searchOptionFront.dopSettings.filter(st => st.id != set.id)
                                                                      stDops.splice(idx, 0, { ...set, id: set.id, min: e[0], max: e[1] })
                                                                      setSearchOptionFront({ ...searchOptionFront, dopSettings: stDops })
                                                                      // setSearchOptionBack({...searchOptionBack,dopSettings:stDops})
                                                                 }}

                                                            />
                                                       </div>
                                                  }
                                             }
                                             )}
                                             <div className="buttons" id={classes.r2}>
                                                  <BigAdvertButton
                                                       id={searchOptionFront.dopSettings.length ? 'on' : 'off'}
                                                       textContent={searchOptionFront.dopSettings.length ? 'Сбросить доп.значения' : ''}
                                                       onClick={e => {
                                                            sendSearchOption(searchOptionFront)
                                                       }
                                                       }
                                                  />
                                                  <BigAdvertButton
                                                       textContent={searchOptionFront.dopSettings.length ? 'Убрать дополнения' : 'Открыть'}
                                                       onClick={e => {
                                                            //  searchOptionBoolean({...searchOptionBoolean,dopSettings:false});
                                                            if (searchOptionFront.dopSettings.length) {
                                                                 setFrontSearchBoolean({ ...searchOptionBoolean, dopSettings: false });
                                                                 setSearchOptionFront({ ...searchOptionFront, dopSettings: [] })
                                                            } else {
                                                                 setFrontSearchBoolean({ ...searchOptionBoolean, dopSettings: true });
                                                                 setSearchOptionFront({ ...searchOptionFrontSAVED })
                                                            }
                                                            console.log(searchOptionBoolean)
                                                            console.log(searchOptionFront)
                                                            console.log(searchOptionFrontSAVED)
                                                       }
                                                       }
                                                  />
                                             </div>
                                        </DopSettingsList>
                                        : ''
                                   }

                              </div>
                              <div className={classes.boxValue}>
                                   <div className={classes.boxValue_top}>
                                        <h5>Сортировка</h5>
                                        <select className={classes.selectCategory}
                                             defaultValue='create_at/desc'
                                             onChange={e => setSearchOptionBack({ ...searchOptionBack, sort: e.target.value })}>
                                             <option value="create_at/desc">По дате размещения</option>
                                             <option value="mileage/asc">По пробегу</option>
                                             <option value="cost/desc">По убыванию цены</option>
                                             <option value="cost/asc">По возрастанию цены</option>
                                        </select>
                                   </div>
                              </div>
                              <MoreButton
                                   id={classes.r1}
                                   onClick={e => { e.preventDefault(); filterAdvert(searchOptionBack, searchOptionFront.dopSettings) }}
                                   textContent={'Применить'} />
                         </div>
                    </div>
               </CSSTransition>
               <div className={classes.items}>
                    {advert.length
                         ? advert.map(advt => <Item
                              key={advt.advt_id}
                              advt={advt} />)
                         : <h2 style={{ textAlign: 'center' }}>Объявлений нет</h2>
                    }
               </div>
          </div>

     )
}

export default AdvertisementPage
