import React, { useContext, useEffect, useRef, useState } from 'react'
import ChatButton from '../components/UI/buttons/ChatButton/ChatButton.jsx'
import ChatListUser from '../components/UI/Lists/ChatListUser/ChatListUser.jsx'
import MessageList from '../components/UI/Lists/MessageList/MessageList.jsx'
import classes from './imgPages/ChatPage.module.css'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../App.js'
import { observer } from 'mobx-react-lite'
import $api from '../utils/AxiosInterceptors.js'
import { unique } from '../utils/function.js'

const ChatPage = () => {
  const params = useParams()
  // * *****************************************
  // ? ХУКИ
  const { store } = useContext(AuthContext)
  const [settings, setSettings] = useState(false)
  //const paramdID = useParams()

  const [room_id, setRoom_id] = useState('');
  const [rooms_id, setRooms_id] = useState([])
  const [limit, setlimit] = useState('')
  const [listUser, setListUser] = useState([])
  const [textMessage, setTextMessage] = useState('')
  const [pageMessage, setPageMessage] = useState(0);
  const [totalPages, setTotalPages] = useState(0)
  const socketConnect = useRef('');
  const [messages, setMessages] = useState([])
  // * *****************************************

  // * *****************************************
  // ? ФУНКЦИИ

  const ioConnect = (room) => {
    console.log('IO')
    console.log(room)
    var count = messages.length;
    console.log(socketConnect.current)
    console.log(room)
    console.log(rooms_id.includes(room))

    if (room && rooms_id.includes(room) == false) {
      rooms_id.push(room)
      console.log("HJ")
      console.log('Присоединение')
      socketConnect.current = io.connect('http://localhost:1500', { transports: ['websocket'] })
      socketConnect.current.emit('joinToChatRoom', room)
    }
    if (rooms_id.includes(room)) {
      socketConnect.current.on('new-message', function (data) {
        console.log(socketConnect.current)
        if (socketConnect.current.connected == true) {
          console.log(room && socketConnect.current.connected != true)
          console.log('CLICK CLACK')
          count++
          if (count == 12) {
            setSettings(false)
          }
          console.log('ДВИЖЕНИЕ И СМЕРТЬ')
          data = { ...data, id: Math.random(15) }
          setMessages(prev => [...prev, data]);
        }

      })
    }
    // if (room && socketConnect.current.connected != true) {
    console.log('usp')
    // }
    console.log(rooms_id)
  }





  const sendMessage = async (textMessage, room) => {
    console.log('HE')
    if (textMessage.length == 0) {
      return
    }
    console.log('sobr')
    const message = {
      event: 'message',
      user_id: store.user.id,
      message: textMessage,
      chatroom_id: room,
    }
    await $api.post(`/chat/message`, message).then(res => {
      socketConnect.current.emit('message', { ...res.data, event: 'message', chatroom_id: room })
      setTextMessage('')
    })
  }
  console.log(messages)
  async function getMessages(user_id) {


    console.log(pageMessage)
    console.log(totalPages)
    await $api.get(`/chat/${user_id}`, {
      params: {
        limit: 12,
        page: pageMessage,
        totalPages
      }
    }).then(res => {
      console.log(res.data)
      console.log(room_id != res.data.room_id)
      if (room_id != res.data.room_id) {
        console.log("SECRET")
        console.log(rooms_id)
        console.log(res.data.room_id)
        console.log(rooms_id.includes(res.data.room_id) == false)
        if (rooms_id.includes(res.data.room_id) == false) {
          console.log('IA TUT')
          ioConnect(res.data.room_id)
        }
        console.log(pageMessage == 0 && res.data.totalPages != 0)
        setPageMessage(0)
        console.log(pageMessage)
        console.log(res.data.page)
        console.log(room_id)
        console.log(res.data.room_id)
        console.log('ZAHOD')
        console.log(res.data.totalPages)
        setTotalPages(res.data.totalPages)

        setRoom_id(res.data.room_id)
        // console.log(rooms_id.includes(room_id) == false)

        //        if (rooms_id.includes(room)) {
        // }
        setMessages(res.data.messages)
        console.log('CHACK')

      } else {
        console.log("VAZA")

        setTotalPages(res.data.totalPages)
        setPageMessage(res.data.page)
        setRoom_id(res.data.room_id)
        if (res.data.messages.length < 15 && pageMessage == 0) {
          console.log('BOOM')
          console.log(res.data.messages.length)
          setMessages(unique([...messages, ...res.data.messages]))
          if ([...res.data.messages, ...messages].length < 15) {
            setSettings(true)
          } else {
            setSettings(false)
          }
          console.log(unique([...res.data.messages, ...messages]))
        } else {
          console.log('BOOMФПФ')
          setMessages(unique([...res.data.messages, ...messages]))
          if ([...res.data.messages, ...messages].length < 15) {
            setSettings(true)
          } else {
            setSettings(false)
          }
          console.log(unique([...res.data.messages, ...messages]))
        }
        //ioConnect    ioConnect(res.data.room_id)
      }
    }).catch(res => console.log(res))

  }
  const getListUser = async () => {
    await $api.get(`/chat`).then(res => { setListUser(res.data); console.log(res.data) })
  }
  const clickEnter = (e) => {
    if (e.key === 'Enter') {
      sendMessage(textMessage, room_id)
    }
  }
  // * *****************************************

  console.log(pageMessage)

  useEffect(() => {
    console.log(room_id)

    console.log('ПРИХОД')
    getListUser()
    if (params.id) {
      getMessages(params.id)
    }
  }, [params.id, pageMessage])

  return (
    <div className={classes.chatPage}>
      <ChatListUser listUser={listUser} />
      {params.id
        ? <div className={classes.mainChat}>
          <MessageList
            room_id={room_id} //   const [room_id, setRoom_id] = useState('');
            pageMessage={pageMessage}
            totalPages={totalPages}
            setTotalPages={setTotalPages}
            setPageMessage={setPageMessage}
            id={settings == false ? classes.overflow : classes.overflowOFF}
            setMessages={setMessages}
            messages={messages} />
          <div className={classes.bottom_chat}>
            <input
              value={textMessage}
              onKeyDown={e => clickEnter(e)}
              onChange={e => setTextMessage(e.target.value)}
              className={classes.inputChat} />
            <ChatButton
              onCLick={e => sendMessage(textMessage, room_id)}
              textContent='Отправить' />
          </div>
        </div>
        : ''
      }

    </div>
  )
}

export default observer(ChatPage)