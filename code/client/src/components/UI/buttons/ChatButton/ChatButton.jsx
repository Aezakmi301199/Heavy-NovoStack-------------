import React from 'react'
import classes from './ChatButton.module.css'
const ChatButton = ({textContent,onCLick}) => {
  return (
    <div onClick={onCLick} className={classes.button22}>
        {textContent}
    </div>
  )
}

export default ChatButton