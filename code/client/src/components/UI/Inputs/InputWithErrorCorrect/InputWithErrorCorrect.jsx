import React from 'react'
import ErrorDiv from '../../errors/ErrorDiv/ErrorDiv'
import classes from './InputWithErrorCorrect.module.css'

const InputWithErrorCorrect = ({ readOnly, value = '', valueError = '', placeholder, onChange, children, onlyCustomClass, customClass, ...props }) => {

  if (children) {
    return (
      <div {...props}
        className={customClass
          ? [classes['boxValue'], customClass].join(' ')
          : classes.boxValue}
      >
        {children}
        <ErrorDiv value={valueError} />
      </div>
    )
  }


  return (
    <div
      {...props}
      className={classes.boxValue} >
      <input
        readOnly={readOnly ? readOnly : false}
        placeholder={placeholder}
        className={
          customClass
            ? customClass
            : classes.inputWithoutCheck}
        //  className={classes.inputWithoutCheck}
        onChange={onChange}
        value={value} />
      <ErrorDiv value={valueError} />
    </div>
  )
}

export default InputWithErrorCorrect


/*

 <InputWithErrorCorrect key={set.id}>
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

*/