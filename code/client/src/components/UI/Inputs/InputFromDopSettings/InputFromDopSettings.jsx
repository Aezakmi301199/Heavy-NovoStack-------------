import React from 'react'
import classes from './InputFromDopSettings.module.css'
const InputFromDopSettings = ({ children, value, onChange, ...props }) => {

 // onChange={e => {setValue(e.target.value)}}
 return (
  <input {...props} value={value} className={classes.inputFromDopSettings} onChange={onChange}></input>
 )
}

export default InputFromDopSettings