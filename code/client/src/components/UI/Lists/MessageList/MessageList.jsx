import React, { useEffect, useMemo, useRef, useState } from 'react'
import $api from '../../../../utils/AxiosInterceptors'
import Message from './Message/Message'
import classes from './MessageList.module.css'
import { io } from 'socket.io-client'
import { getNowTimeAndDate, makeNormalDateAndTime } from '../../../../utils/function'

const MessageList = ({ setTotalPages, setMessages, messages, pageMessage, setPageMessage, totalPages, room_id, ...props }) => {

  const firstMess = useRef();
  const lastMess = useRef();
  const [newRoom_id, setNewRoom_id] = useState('')
  const observer = useRef();
  const [lastPage, setLastPage] = useState(false)
  const [postLoading, setLoading] = useState('1')
  const [ud, setud] = useState(0)
  useEffect(() => {
    console.log("ZDES")
    console.log(totalPages)
    console.log(pageMessage)
    //lastMess.current = lastMess;
    if (observer.current) {
      observer.current.disconnect()
    }
    var count = 0;
    //          lastMess.current.value = ''
    var callback = function (entries, observer) {
      if (totalPages > pageMessage && totalPages != 0) {
        console.log('В ЗОНЕ ВИДИМОСТИ')
        if (totalPages == ((count / 2) + 0.5)) {
          console.log("DOA")
          setLastPage(true)
        }
        if (totalPages > ((count / 2) + 0.5)) {
          console.log("LAGA")
          count = count + 1;
        }
        if (entries[0].isIntersecting) {
          console.log('z tata')
          if (lastMess.current) {
            lastMess.current.scrollIntoView({ behavior: 'smooth' })
          }
        }

        if (entries[0].isIntersecting) {
          console.log(room_id)
          console.log(newRoom_id)
          console.log(room_id)
          if (room_id != newRoom_id && newRoom_id != '') {
            console.log(room_id)
            console.log('ОШИБКА')
            setPageMessage(0)
          } else {
            setNewRoom_id(room_id)
            setPageMessage(prev => prev + 1)
          }

          console.log('hate me')
          if (lastMess.current) {
            setTimeout(() => {
              lastMess.current.scrollIntoView({ behavior: 'smooth' })
            }, 500)
          }
        }

        //  lastMess.current.scrollIntoView({ behavior: 'smooth' })
        //  setPageMessage(prev => prev+1)

      }
    };

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(firstMess.current)


  }, [totalPages, room_id])


  useEffect(() => {
    console.log('VASDASDADASDAS')
    if (lastMess.current) {
      setTimeout(() => {
        lastMess.current.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
    console.log(lastMess.current)
  }, [messages.length])

  return (
    <div {...props} className={classes.messageList}>
      <div className={lastPage === false ? classes.first_el : classes.first_el_off} ref={firstMess}></div>
      {messages ?
        messages.map((mess, idx) => messages.length == idx + 1
          ? <Message
            key={mess.id}
            innerRef={lastMess}
            create_at={makeNormalDateAndTime(mess.create_at)}
            message={mess.message}
            login={mess.login} />
          : <Message key={mess.id}
            create_at={makeNormalDateAndTime(mess.create_at)}
            message={mess.message}
            login={mess.login} />
        )
        : ''
      }

    </div>
  )
}

export default MessageList

//         <div className={classes.last_el} ref={lastMess}></div>