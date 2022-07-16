import React from 'react'
import classes from './ErrorDiv.module.css'
const ErrorDiv = ({id,value,customClass,...props}) => {

  return (
    <div {...props}  id={id} className={value  
    ? customClass 
     ? [customClass,classes['on']].join(' ') 
     : classes.on
    : classes.false}>
        {value}
    </div>
  )
}

export default ErrorDiv

/*

 return (
    <div {...props}  id={id} className={value  ? classes.on : classes.false}>
        {value}
    </div>
  )
*/