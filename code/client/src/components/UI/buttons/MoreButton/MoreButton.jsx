import React from 'react'
import classes from './MoreButton.module.css'
const MoreButton = ({onClick,textContent,id,...props}) => {
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

export default MoreButton

/*

    <MoreButton 
                              id={classes.r1}
                              onClick={e => {e.preventDefault();filterAdvert(searchOptionBack)}}
                              textContent={'Применить'}/>  


*/