import React from 'react'
import classes from './Message.module.css'
const Message = ({message,login,create_at,innerRef,...props}) => {
  if (innerRef) {
    return ( 
      <div {...props} ref={innerRef} className={classes.messageFlex}>
      <h3>{login}</h3>
      <h4>{message}</h4>

      <h6 className={classes.time}>  {create_at}</h6>
  </div>
    )
  }
  return (
    <div {...props} className={classes.messageFlex}>
        <h3>{login}</h3>
        <h4>{message}</h4>

        <h6 className={classes.time}>  {create_at}</h6>
    </div>
  )
}

export default Message