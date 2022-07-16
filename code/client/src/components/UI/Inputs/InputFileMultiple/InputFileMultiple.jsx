import React from 'react'
import classes from './InputFileMultiple.module.css'
import close from '../../../../img/close.png'
const InputFileMultiple = ({ type, accept, items, customStyle, onChange, ...props }) => {
  return (
    <div className={classes.inputWithoutCheck}>
      <input
        {...props}
        type={type}
        multiple='multiple'
        accept={accept}
        // className={classes.inputWithoutCheck} //   setNotDownPic([...picObj])
        onChange={onChange}
      />
      <div className="images">
        <h3 id={classes.pich3}> {items.length ? 'Загруженные фото' : ''}</h3>
        {items.length > 0
          ? items.map(pic => <div key={pic.lastModified} className={classes.downImages}>
            <h5 className={classes.imageh5}> {pic.name}</h5>
          </div>)
          : ''}
      </div>
    </div>
  )
}
export default InputFileMultiple
// <img src={close} className={classes.pic15px15px} />