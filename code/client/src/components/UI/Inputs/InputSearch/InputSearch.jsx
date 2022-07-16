import React from 'react'
import classes from './InputSearch.module.css'
const InputSearch = ({ onClick, ...props }) => {

  return (
    <input
      {...props}
      className={classes.inputSearch}
      onClick={onClick} />
  )
}

export default InputSearch