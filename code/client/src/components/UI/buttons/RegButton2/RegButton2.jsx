import React from 'react'
import classes from './RegButton2.module.css'
import '../../../../App.css'
const RegButton2 = ({onClick,textContent,id,...props}) => {
  return (
    <button
    {...props}
     id={id}
     className={[classes["btn"], classes["fourth"] ].join(" ")}
     onClick={onClick}>
         {textContent}
    </button>
  )
}

export default RegButton2