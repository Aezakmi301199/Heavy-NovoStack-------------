import React from 'react'
import classes from './ProfileButton.module.css'
const ProfileButton = ({textContent,onClick}) => {
  return (
    <button onClick={onClick}  className={classes.addToFriendButton}>
        {textContent}
    </button>
  )
}

export default ProfileButton