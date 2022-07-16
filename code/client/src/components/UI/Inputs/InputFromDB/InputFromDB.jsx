import React, { useEffect } from 'react'
import classes from './InputFromDB.module.css'
import { CSSTransition } from 'react-transition-group'
import refresh from '../../../../img/refresh.png'
import plus from '../../../../img/plus.png'
import ErrorDiv from '../../errors/ErrorDiv/ErrorDiv'
import ExitButton from '../../buttons/ExitButton/ExitButton'
import { removeItemFromArray, useInputLag } from '../../../../utils/function'
import { advtMainCritFrontST, advtMainCritSearchBackST } from '../../../../utils/useStateObjects'
import cancel from '../../../../img/cancel.png'
import searchPic from '../../../../img/search2.png'
import InputWithErrorCorrect from '../InputWithErrorCorrect/InputWithErrorCorrect'
import { useState } from 'react'
import InputRegWithPicture from '../InputRegWithPicture/InputRegWithPicture'
const InputFromDB = ({ cru, cruObj, crud, idx, keyFromMs, builderCategory, setBuilderCategory, needReturnResult, searchOptionBack, searchOptionBoolean, searchOptionFrontSAVED, searchOptionFront,
  setSearchOptionBack, setFrontSearchBoolean, setSearchOptionFrontSAVED, setSearchOptionFront, sendSearchOption,
  criterieSetting, error, children, customClass, ...props }) => {
  const filteredByINPUTEPTA = (frontOptionSavedWithCriterie, frontOption, setOptionFront, criterie, value, valueLength) => {
    console.log(searchOptionFrontSAVED)
    console.log(searchOptionFront)
    console.log(Array.isArray(frontOptionSavedWithCriterie))
    console.log(frontOptionSavedWithCriterie)
    console.log(value)
    console.log(frontOption)
    if (valueLength == 0) {
      setOptionFront({ ...frontOption, [criterieSetting]: [] })
      return
    }
    if (typeof (frontOptionSavedWithCriterie) == 'string') {
      console.log(searchOptionFront)
      console.log(searchOptionFrontSAVED)
      // searchOptionFrontSAVED[criterieSetting]
      setSearchOptionFrontSAVED({ ...searchOptionFrontSAVED, [criterie]: frontOption[criterie] })
      return
    }
    if (frontOptionSavedWithCriterie == undefined) {
      let ms = frontOption[criterie]
        .filter(cat => cat[criterie].toLowerCase().includes(value.toLowerCase()))
      setSearchOptionFrontSAVED({ ...frontOption, [criterieSetting]: ms })
      console.log(ms)
      return
    }
    console.log(frontOptionSavedWithCriterie)
    if (frontOptionSavedWithCriterie.length) {
      let ms = frontOptionSavedWithCriterie
        .filter(cat => cat[criterie].toLowerCase().includes(value.toLowerCase()))
      setOptionFront({ ...frontOption, [criterieSetting]: ms })
    }
  }
  const [modalSpares, setModalSpares] = useState(false)
  const [modalMsObjectForCRU, setModalMsObjectForCru] = useState(false)
  const [modalObjectForCRU, setModalObjectForCRU] = useState({})
  const lagSearch = useInputLag(filteredByINPUTEPTA, 300)
  const [fromInputFromDBRez, setInputFromDBRez] = useState({ id: '', subcategory: '', valueNow: '', spares: [], subcategorytype: 'string' })

  useEffect(() => {
    if (cru) {
      setModalObjectForCRU(cruObj)
    }
    if (crud) {
      console.log('nosok2')
      if (builderCategory) {
        console.log('nosok1')
        let check = builderCategory.inputString.findIndex(inputString => inputString?.id == idx)
        console.log(idx)
        console.log(check)
        console.log(builderCategory.inputString)
        console.log(searchOptionFront)
        if (check != -1) {
          console.log('nosok4')
          setInputFromDBRez({ ...builderCategory.inputString[check] })
        } else {
          console.log('nosok5')
          setInputFromDBRez({ ...fromInputFromDBRez, id: idx })
          builderCategory.inputString.splice(keyFromMs, 1, { ...fromInputFromDBRez, id: idx })
          setBuilderCategory({ ...builderCategory, inputString: [...builderCategory.inputString] })
          // console.log({ ...builderCategory, inputNumber: [...builderCategory.inputNumber, { ...fromToSliderRez, id: idx }] })
          //setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber, { ...fromToSliderRez, id: idx }] })
        }
      }
    }

  }, [idx])
  console.log(fromInputFromDBRez)
  console.log(fromInputFromDBRez.spares)
  console.log(searchOptionBack)
  console.log(searchOptionFront)
  console.log(modalSpares)

  useEffect(() => {
    console.log('nemiga')
    if (searchOptionFront && criterieSetting) {
      if (Array.isArray(searchOptionFront[criterieSetting]) && criterieSetting != 'category') {
        console.log(searchOptionFront)
        console.log(criterieSetting)
        console.log(searchOptionFront[criterieSetting])

        let spares = []
        for (let i = 0; i < Object.keys(searchOptionFront[criterieSetting]).length; i++) {
          spares.push({
            id: searchOptionFront[criterieSetting][i].id,
            value: searchOptionFront[criterieSetting][i][criterieSetting] || searchOptionFront[criterieSetting][i]?.value,
          })
        }
        console.log(spares)
        setInputFromDBRez({ ...fromInputFromDBRez, spares: spares })
        console.log({ ...fromInputFromDBRez, spares: spares })
      }
    }
  }, [searchOptionFront])

  if (cru) {
    return <div id={classes.mw210px} className='marginTop10px relative' {...props}>
      <input
        readOnly
        className={classes.imitSelectCategory}
        placeholder={cruObj.placeholder ? cruObj.placeholder : ''}
      />
      <div className={customClass ? [classes['boxValue'], customClass].join(' ') : classes.boxValue}>
        <InputWithErrorCorrect
          onClick={e => {
            console.log(modalObjectForCRU)
            console.log(modalObjectForCRU.ms)
            if (modalObjectForCRU.ms.length > 0) {
              setModalMsObjectForCru(!modalMsObjectForCRU)
            }
          }}
          placeholder='Введите данные'
          customClass={classes.inputUniversal}
          value={modalObjectForCRU.value ? modalObjectForCRU.value : ''}
          onChange={e => {
            setModalObjectForCRU({ ...modalObjectForCRU, value: e.target.value })
          }}
        />
        <img src={plus} onClick={e => {
          if (modalObjectForCRU.value == '') {
            return
          } else {
            setModalObjectForCRU(
              {
                ...modalObjectForCRU,
                value: '',
                ms: [...modalObjectForCRU.ms, { id: Date.now(), value: modalObjectForCRU.value }]
              })
            setBuilderCategory({
              ...builderCategory,
              [cruObj.name]: [...modalObjectForCRU.ms, { id: Date.now(), value: modalObjectForCRU.value }]
            })
          }
        }} />
        <CSSTransition in={modalMsObjectForCRU} timeout={300} classNames="alert" unmountOnExit>
          <div className={classes.row}>
            {cruObj.ms.length > 0
              ? cruObj.ms
                .map(spare => <div key={spare.id} className={['flexRowJustifySpaceBetween', classes['divWithPic']].join(' ')}>
                  <div>{spare.value}</div>
                  <img src={cancel} className='img_1rem'
                    onClick={e => {
                      let sparesFiltered = removeItemFromArray(spare, 'value', modalObjectForCRU.ms)
                      setModalObjectForCRU({ ...modalObjectForCRU, ms: sparesFiltered })
                      setBuilderCategory({ ...builderCategory, [cruObj.name]: sparesFiltered })
                    }
                    } />
                </div>
                )
              : ''}
          </div>
        </CSSTransition>
      </div>
      <ErrorDiv id={classes.errorAbsoluteBottom} value={error} />
    </div>
  }
  if (crud) {
    return <div className='marginTop10px' {...props}>
      <input
        onChange={e => {
          setInputFromDBRez({ ...fromInputFromDBRez, subcategory: e.target.value })
          builderCategory.inputString.splice(keyFromMs, 1, { ...fromInputFromDBRez, subcategory: e.target.value })
          setBuilderCategory({ ...builderCategory, inputString: builderCategory.inputString })
        }}
        // id={searchOptionBack && searchOptionFront ? 'unClickableDiv' : ''}
        className={classes.imitSelectCategory}
        placeholder='Название доп.настройки'
        value={fromInputFromDBRez['subcategory']}
      />
      <div className={customClass ? [classes['boxValue'], customClass].join(' ') : classes.boxValue}>
        <InputWithErrorCorrect
          //  valueError={valueNumberError?.subcategory ? valueNumberError.subcategory : ''}
          onClick={e => {
            console.log(searchOptionFront)
            console.log([] == [])
            console.log(searchOptionFront && criterieSetting)

            if (searchOptionBack && Array.isArray(searchOptionFront[criterieSetting]) == false) {
              sendSearchOption(searchOptionFront, [criterieSetting], true)
              console.log('EAZY E')
              console.log(searchOptionFront)
            }
            if (fromInputFromDBRez?.spares?.length) {
              setModalSpares(!modalSpares)
            } else if (searchOptionFront && criterieSetting) {
              console.log('ONLY IF YOU WANT IT')
              setModalSpares(!modalSpares)
            }
          }}
          placeholder='Введите данные'
          customClass={classes.inputUniversal}
          value={fromInputFromDBRez['valueNow']}
          onChange={e => {
            setInputFromDBRez({ ...fromInputFromDBRez, valueNow: e.target.value })
          }} />
        <img src={plus} onClick={e => {
          if (fromInputFromDBRez.valueNow == '') {
            return
          } else {
            setInputFromDBRez({ ...fromInputFromDBRez, valueNow: '', spares: [...fromInputFromDBRez.spares, { value: fromInputFromDBRez.valueNow }] })
            builderCategory.inputString
              .splice(keyFromMs, 1, { ...fromInputFromDBRez, spares: [...fromInputFromDBRez.spares, { value: fromInputFromDBRez.valueNow }] })
            setBuilderCategory({ ...builderCategory, inputString: builderCategory.inputString })
          }
        }} />
        <img src={cancel} className='img_1rem'
          onClick={e => {
            console.log(fromInputFromDBRez)
            if (fromInputFromDBRez['subcategory'] == '') {
              console.log('ALAL')
              builderCategory.inputString.splice(keyFromMs, 1)
              setBuilderCategory({ ...builderCategory, inputString: [...builderCategory.inputString] })
              return
            }
            let inputString = removeItemFromArray(fromInputFromDBRez, 'subcategory', builderCategory.inputString);
            console.log(inputString)
            setBuilderCategory({ ...builderCategory, inputString: inputString })
          }} />
        <CSSTransition in={modalSpares} timeout={300} classNames="alert" unmountOnExit>
          <div className={classes.row}>
            {fromInputFromDBRez?.spares?.length > 0
              ? fromInputFromDBRez.spares
                .map(spare => <div key={spare.value} className={['flexRowJustifySpaceBetween', classes['divWithPic']].join(' ')}>
                  <div>{spare.value}</div>
                  <img src={cancel} className='img_1rem'
                    onClick={e => {
                      console.log(spare)
                      console.log(searchOptionFront)

                      let sparesFiltered = removeItemFromArray(spare, 'value', fromInputFromDBRez.spares)
                      console.log(sparesFiltered)
                      console.log(criterieSetting)
                      console.log('ak')
                      console.log(searchOptionFront)
                      console.log(sparesFiltered)
                      builderCategory.inputString.splice(keyFromMs, 1, { ...fromInputFromDBRez, spares: sparesFiltered })
                      setInputFromDBRez({ ...fromInputFromDBRez, spares: sparesFiltered })
                      setBuilderCategory({ ...builderCategory, inputString: builderCategory.inputString })
                      if (searchOptionFront && criterieSetting) {
                        if (Array.isArray(searchOptionFront[criterieSetting]) && searchOptionFront[criterieSetting] != 'category') {
                          console.log('ХЕЛЛОУ ИТС МИ')
                          setSearchOptionFront({ ...searchOptionFront, [criterieSetting]: sparesFiltered })
                          console.log({ ...searchOptionFront, [criterieSetting]: sparesFiltered })
                        }
                        //    setBuilderCategory({ ...builderCategory, inputString: builderCategory.inputString })
                      }
                    }
                    } />
                </div>
                )
              : ''}
          </div>
        </CSSTransition>
      </div>
      <ErrorDiv value={error} />
    </div>
  }


  return (
    <div {...props} className={classes.boxValue}>
      <input
        onChange={e => {
          console.log(e.target.value.length)
          console.log('ИЗМЕНА')
          console.log(searchOptionBack)
          console.log(searchOptionFront)
          console.log(searchOptionFrontSAVED)
          setSearchOptionBack({ ...searchOptionBack, [criterieSetting]: e.target.value })
          lagSearch(searchOptionFrontSAVED[criterieSetting], searchOptionFront, setSearchOptionFront, [criterieSetting], e.target.value, e.target.value.length)

        }}
        onClick={e => {
          console.log('КЛИК')
          console.log(searchOptionBack)
          console.log(searchOptionFront)
          // ! НЕ ВЕРЮ
          sendSearchOption(searchOptionFront, [criterieSetting], true)
        }}
        className={classes.inputUniversal}
        placeholder=''
        value={searchOptionBack[criterieSetting] ? searchOptionBack[criterieSetting] : ''}
      />
      {children
        ? children
        : ''}
      <img src={refresh} onClick={e => {
        console.log(searchOptionBack)
        console.log(searchOptionFront)
        console.log(searchOptionFrontSAVED)

        setSearchOptionBack({ ...searchOptionBack, [criterieSetting]: '' })
        if (criterieSetting == 'category') {
          console.log('')
          setSearchOptionFront(advtMainCritFrontST, [criterieSetting], false)
        } else {
          sendSearchOption(searchOptionFront, [criterieSetting], false)
        }
        setFrontSearchBoolean({ ...searchOptionBoolean, [criterieSetting]: false })
        console.log('ZAL')

      }} />

      <ErrorDiv id={classes.errovDivPos} value={error}
      />
      <CSSTransition in={searchOptionBoolean[criterieSetting]} timeout={300} classNames="alert" unmountOnExit>
        <div className={classes.row}>
          {searchOptionFront[criterieSetting] && Array.isArray(searchOptionFront[criterieSetting]) == false
            ? ''
            : searchOptionFront[criterieSetting]
              ? searchOptionFront[criterieSetting]
                .map(cat => <div onClick={e => {
                  console.log('ВЫБОР ФАЙЛА')
                  console.log(searchOptionBack, criterieSetting, cat[criterieSetting])
                  setSearchOptionBack({ ...searchOptionBack, [criterieSetting]: cat[criterieSetting] })
                  //  searchOptionBack,[criterieSetting],true

                  sendSearchOption(searchOptionFront, criterieSetting, cat[criterieSetting])
                  setFrontSearchBoolean({ ...searchOptionBoolean, [criterieSetting]: false })
                }
                } key={cat.id}>{cat[criterieSetting]}</div>)
              : ''}
        </div>
      </CSSTransition>
    </div>
  )
}

export default InputFromDB



/*





 const sendSearchOption = async(searchOptionView,criterieSetting,changedSearch) => {
    //  searchOptionBack,[criterieSetting],true
    console.log(searchOptionBack.hasOwnProperty('tentakli'))
    if (searchOptionBack.hasOwnProperty(criterieSetting))
    console.log([criterieSetting],changedSearch)
    if (changedSearch == true) {
      searchOptionView = {...searchOptionView,[criterieSetting]:changedSearch}
      await $api.post('/advertisments',searchOptionView)
      .then(res => {
        console.log(changedSearch)
        setFrontSearchBoolean({...searchOptionBoolean,[criterieSetting]:changedSearch})
        setSearchOptionFront({...searchOptionFront,...res.data})
        setSearchOptionFrontSAVED({...searchOptionFront,...res.data})
      })
    }  else {
      searchOptionView = {...searchOptionView,[criterieSetting]:changedSearch}
      await $api.post('/advertisments',searchOptionView)
      .then(res => {
        setFrontSearchBoolean({...searchOptionBoolean,dopSettings:true})
        setSearchOptionFront({...searchOptionFront,...res.data})
        setSearchOptionFrontSAVED({...searchOptionFront,...res.data})
      })
    }
  }





      <InputAdminPanelView
       textContent={'Поиск брендов по категории'}
       searchInBaseBy={'brand'}
       criterieSetting={'category'}
       sendSearchOption={sendSearchOption}
       searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
       searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
       searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
       searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
       errorValidatorCriterieSetting={errorValidator.category}
      />
      <InputAdminPanelView
       textContent={'Просмотр настроек категории'}
       searchInBaseBy={'brand'}
       criterieSetting={'category'}
       sendSearchOption={sendSearchOption}
       searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
       searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
       searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
       searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
       errorValidatorCriterieSetting={errorValidator.category}
      />




*/
