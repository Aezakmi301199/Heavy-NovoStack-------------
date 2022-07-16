import React from 'react'
import { useNavigate } from 'react-router-dom'
import ExitButton from '../components/UI/buttons/ExitButton/ExitButton'
import classes from './imgPages/Error.module.css'
const ErrorPage = () => {
  const navigate = useNavigate()
  return (
    <div className={classes.ErrorPage}>
      <h1 id={classes.bigH1}> 404 </h1>
      <h3 id={classes.bigh3}> Страница не найдена </h3>
      <div className={classes.exit}>
        <h3>Не возвращайся сюда никогда,пожалуйста!</h3>
        <ExitButton
          onClick={e => navigate('/mainpage')}
          textContent={'Переосмыслить жизнь'} />
      </div>
    </div>
  )
}

export default ErrorPage