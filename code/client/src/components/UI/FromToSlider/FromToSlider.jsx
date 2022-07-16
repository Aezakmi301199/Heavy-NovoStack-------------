import React, { useEffect } from 'react'
import { useState } from 'react'
import SuperUniversalModal from '../Modals/SuperUniversalModal/SuperUniversalModal'
import cancel from '../../../img/cancel.png'
import classes from './FromToSlider.module.css'
import { removeItemFromArray } from '../../../utils/function'
import InputWithErrorCorrect from '../Inputs/InputWithErrorCorrect/InputWithErrorCorrect'
const FromToSlider = ({ searchOptionFront, setSearchOptionFront, keyFromMs, idx, valueNumberError, builderCategory, setBuilderCategory, textContent, onChangeStart, children, onChangeFinish, valueProp, crud, ...props }) => {
  console.log(crud)
  console.log(builderCategory)
  const [fromToSliderRez, setFromSliderRez] =
    useState({ id: '', subcategory: '', min: '', max: '', unit: '', subcategorytype: 'number' })

  console.log(fromToSliderRez)
  useEffect(() => {
    console.log('ALLOHA')
    if (builderCategory) {
      console.log(builderCategory)
      console.log(idx)
      let check = builderCategory.inputNumber.findIndex(inputNum => inputNum?.id == idx)
      if (check != -1) {
        console.log(check)
        console.log(builderCategory.inputNumber[check])
        setFromSliderRez({ ...builderCategory.inputNumber[check] })
        console.log('TUDA')
      } else {
        //  setFromSliderRez({ ...fromToSliderRez, id: idx })
        console.log({ ...fromToSliderRez, id: idx })
        setFromSliderRez({ ...fromToSliderRez, id: idx })
        console.log('SUDA')
        //let inputNumber = removeItemFromArray(fromToSliderRez, 'subcategory', builderCategory.inputNumber);
        //   setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber] })
        builderCategory.inputNumber.splice(keyFromMs, 1, { ...fromToSliderRez, id: idx })
        setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber] })
        //setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber, { ...fromToSliderRez, id: idx }] })
      }

    }

  }, [idx])



  console.log(fromToSliderRez)
  if (crud) {

    return <div className={[classes['boxValue'], classes['boxValueTriple']].join(' ')} {...props} >
      <div className={classes.cancel}>
        <img src={cancel} className='img_1rem'
          onClick={e => {
            console.log(fromToSliderRez['subcategory'])
            if (fromToSliderRez['subcategory'] == '') {
              builderCategory.inputNumber.splice(keyFromMs, 1)
              console.log(builderCategory.inputNumber)
              setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber] })
              return
            }
            console.log('rezoto')
            console.log(fromToSliderRez)
            console.log(builderCategory.inputNumber)

            let inputNumber = removeItemFromArray(fromToSliderRez, 'subcategory', builderCategory.inputNumber);
            //    setFromSliderRez({ id: '', subcategory: '', min: '', max: '', unit: '', subcategorytype: 'number' })
            console.log(inputNumber)
            console.log({ ...builderCategory, inputNumber: inputNumber })
            //   console.log({ ...builderCategory, inputNumber: inputNumber })
            setBuilderCategory({ ...builderCategory, inputNumber: inputNumber })
          }} />
      </div>
      <InputWithErrorCorrect
        valueError={valueNumberError?.subcategory ? valueNumberError.subcategory : ''}
        placeholder='Название доп.настройки'
        customClass={classes.imitSelectCategory}
        value={fromToSliderRez['subcategory']}
        onChange={e => {
          setFromSliderRez({ ...fromToSliderRez, subcategory: e.target.value })
          // index
          // let index = builderCategory.inputNumber.findIndex(inputNum => inputNum.id == fromToSliderRez.id)
          console.log(builderCategory.inputNumber)
          console.log(keyFromMs)

          builderCategory.inputNumber.splice(keyFromMs, 1, { ...fromToSliderRez, subcategory: e.target.value })

          //  console.log(builderCategory.inputNumber)
          setBuilderCategory({ ...builderCategory, inputNumber: builderCategory.inputNumber })
        }} />
      <div className={classes.mileage}>
        <div className={classes.triple}>
          <InputWithErrorCorrect
            valueError={valueNumberError?.min ? valueNumberError.min : ''}
            placeholder='От'
            customClass={classes.imitSelectCategory}
            value={fromToSliderRez['min']}
            onChange={e => {
              setFromSliderRez({ ...fromToSliderRez, min: e.target.value })
              builderCategory.inputNumber.splice(keyFromMs, 1, { ...fromToSliderRez, min: e.target.value })

              setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber] })
            }} />
          <InputWithErrorCorrect
            valueError={valueNumberError?.max ? valueNumberError.max : ''}
            placeholder='До'
            customClass={classes.imitSelectCategory}
            value={fromToSliderRez['max']}
            onChange={e => {
              setFromSliderRez({ ...fromToSliderRez, max: e.target.value })
              builderCategory.inputNumber.splice(keyFromMs, 1, { ...fromToSliderRez, max: e.target.value })
              setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber] })
            }} />
          <InputWithErrorCorrect
            valueError={valueNumberError?.unit ? valueNumberError.unit : ''}
            placeholder='Система измерения'
            customClass={classes.imitSelectCategory}
            value={fromToSliderRez['unit']}
            onChange={e => {
              setFromSliderRez({ ...fromToSliderRez, unit: e.target.value })
              builderCategory.inputNumber.splice(keyFromMs, 1, { ...fromToSliderRez, unit: e.target.value })
              setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber] })
            }} />
        </div>
      </div>
    </div >
  }


  return (
    <div className={classes.boxValue} {...props} >
      <h5>{textContent}</h5>
      <div className={classes.mileage}>
        <div className={classes.double}>
          <input
            className={classes.imitSelectCategory}
            placeholder='От'
            onChange={onChangeStart} />
          <input
            className={classes.imitSelectCategory}
            placeholder='До'
            onChange={onChangeFinish} />
        </div>
      </div>
    </div>
  )
}

export default FromToSlider

/*
<InputWithErrorCorrect
    className={}
     placeholder='Название доп.настройки'
     onChange={e => {
      setFromSliderRez({ ...fromToSliderRez, subcategory: e.target.value })
      builderCategory.inputNumber.splice(idx, 1, { ...fromToSliderRez, subcategory: e.target.value })
      setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber] })
     }}
    />

*/