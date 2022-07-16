import React, { Children } from 'react'
import classes from './UniversalModal.module.css'
const UniversalModal = ({visible,setVisible,children,...props}) => {
  return (
    <div
    {...props}
    className={visible ? classes.modalOn:classes.modalOff}
    >
       {children}
    </div>
  )
}

export default UniversalModal