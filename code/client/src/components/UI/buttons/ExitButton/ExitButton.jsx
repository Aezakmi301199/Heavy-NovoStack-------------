import React from 'react'
import classes from './ExitButton.module.css'
const ExitButton = ({onClick,textContent,...props}) => {
  return (
    <div {...props} className={[classes["btn"], classes["btn-one"] ].join(" ")}>
      <span className={classes.span} onClick={onClick} >{textContent}</span>
   </div>
  )
}

export default ExitButton