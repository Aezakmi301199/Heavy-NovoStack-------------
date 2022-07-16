import React from 'react'
import classes from './BigAdvertButton.module.css'
const BigAdvertButton = ({textContent,onClick,...props}) => {
  return (
    <button className={classes.bot1} {...props} onClick={onClick}>
        {textContent}
    </button>
  )
}

export default BigAdvertButton