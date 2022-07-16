import React from 'react'
import classes from './InputReg.module.css'
const InputReg = ({ value, onChange, ...props }) => {
  return (
    <input {...props} value={value} onChange={onChange} className={classes.inputReg} />
  )
}

export default InputReg