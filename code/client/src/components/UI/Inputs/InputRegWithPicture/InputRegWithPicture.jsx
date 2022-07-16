import React from 'react'
import classes from './InputRegWithPicture.module.css'
const InputRegWithPicture = (props) => {
  return (
    <div 
    className={props.className}
    {...props} id={classes.InputRegWithPicture}>
        {props.children}
    </div>
  )
}

export default InputRegWithPicture