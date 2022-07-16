import React from 'react'
import classes from './DopSettingsList.module.css'
const DopSettingsList = ({ children, ...props }) => {


  return (
    <div {...props} className={classes.dopSettings}>
      {children}
    </div>
  )
}

export default DopSettingsList
/*

#colorWhite>*>p {
    color: white;
    margin-bottom: 5px;
}
*/