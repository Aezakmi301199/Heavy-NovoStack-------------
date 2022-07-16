import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MoreButton from '../components/UI/buttons/MoreButton/MoreButton'
import InputFromDopSettings from '../components/UI/Inputs/InputFromDopSettings/InputFromDopSettings'
import classes from './imgPages/ForgetPasswordPage.module.css'

const ForgetPasswordPage = () => {
 const [questions, setQuestions] = useState([
  'Введите примерную дату вашей регистрации',
  'При наличии фото док-в владения аккаунтом прикрепите ссылку',
  'Перечислите все использованные ранее пароли',
  'Любимая марка автомобиля',
  'Как вам погода сегодня'
 ])


 const [reportedQuestion, setReportedQuestion] = useState({})
 const [message, setMessage] = useState('')
 const navigate = useNavigate()
 const sendRequest = (message, reportedQuestion) => {
  // ! запрос не был составлен потому лишь симуляция
  navigate('/mainpage')
 }

 return (
  <div className="">
   <h2 className='textCenter'>Введите как можно больше ответов на вопросы</h2>
   <div className={[classes['forgetPasswordPage'], 'marginTop10pxAll'].join(' ')}>
    {questions.length > 0
     ? questions.map((quest, idx) => <InputFromDopSettings
      key={idx}
      onChange={e => setReportedQuestion({ ...reportedQuestion, [`question${idx}`]: e.target.value })}
      placeholder={quest} />)
     : ''}
    <textarea
     onChange={e => setMessage(e.target.value)}
     id={classes.textarea}
     placeholder='Описание полной ситуации'></textarea>
    <MoreButton textContent='Отправить запрос' onClick={e => sendRequest(message, reportedQuestion)} />
   </div>
  </div>
 )
}

export default ForgetPasswordPage