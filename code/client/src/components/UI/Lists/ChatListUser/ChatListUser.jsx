import React from 'react'
import classes from './ChatListUser.module.css'
import avatarST from '../../../../img/profile.png'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ChatListUser = ({ listUser }) => {

    // ****************************************
    // ? ХУКИ 
    const navigate = useNavigate()
    // ****************************************

    return (
        <div className={classes.chatList}>
            {listUser.length > 0
                ? listUser.map(user =>
                    <div key={user.chatroom_id} className={classes.user}>
                        <div className={classes.portrait}>
                            <img src={user.avatar ? user.avatar : avatarST} onClick={e => navigate(`/profile/${user.user_id}`)} />
                        </div>
                        <div className={classes.userName} onClick={e => navigate(`/chat/${user.user_id}`)}>
                            <h5>{user.login}</h5>
                            <h6>Был в сети 04:05</h6>
                        </div>
                    </div>)
                : []}
        </div>
    )
}

export default ChatListUser
                     //   <h5>Salavat</h5>