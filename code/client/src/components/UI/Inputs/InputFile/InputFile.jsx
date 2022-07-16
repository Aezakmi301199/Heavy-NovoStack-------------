import React from 'react'

import classes from './InputFile.module.css'
import close from '../../../../img/close.png'
const InputFile = ({ type, accept, item, customStyle, onChange, ...props }) => {
 console.log(item)
 return (
  <div className={classes.inputWithoutCheck}>
   <div className={[classes['width150pxInput'], 'cont_flex_center'].join(' ')}>
    <input
     {...props}
     type={type}
     accept={accept}
     // className={classes.inputWithoutCheck} //   setNotDownPic([...picObj])
     onChange={onChange}
    />
   </div>
   <div className="images">
    <h3 id={classes.pich3}> {item ? 'Загруженное фото' : ''}</h3>
    {item
     ? <div key={item.lastModified} className={classes.downImages}>
      <h5 className={classes.imageh5}> {item.name}</h5>
     </div>
     : ''}
   </div>
  </div>
 )
}

export default InputFile

