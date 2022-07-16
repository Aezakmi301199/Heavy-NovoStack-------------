import React, { useContext, useState } from 'react'
import InputReg from '../../Inputs/InputReg/InputReg'
import classes from './ModalReg.module.css'
import message from '../../../../img/message.png'
import lock from '../../../../img/lock.png'
import emailPic from '../../../../img/email.png'
import loginPic from '../../../../img/login.png'
import phonePic from '../../../../img/phone.png'
import InputRegWithPicture from '../../Inputs/InputRegWithPicture/InputRegWithPicture.jsx'
import RegButton from '../../buttons/RegButton/RegButton'
import RegButton2 from '../../buttons/RegButton2/RegButton2'
import ModalAuth from '../ModalAuth/ModalAuth'
import axios from "axios"
import $api from '../../../../utils/AxiosInterceptors'
import { AuthContext } from '../../../../App'
import { useNavigate } from 'react-router-dom'
import ErrorDiv from '../../errors/ErrorDiv/ErrorDiv'
const ModalReg = () => {
  const { store } = useContext(AuthContext);
  const [user, setUser] = useState({ login: '', email: '', phone: '', password: '', repeatPassword: '', age: '', gender: '', first_name: '', last_name: '', })

  const navigate = useNavigate('');
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmaiErrorl] = useState('');
  const [phoneError, setPhoneErrorr] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [ageError, setAgeError] = useState('');
  const sendRegInfo = async (e, registrationAction) => {
    e.preventDefault();
    let rez = await registrationAction;
    console.log(rez)
    setLoginError('');
    setEmaiErrorl('');
    setPhoneErrorr('');
    setPasswordError('');
    setRepeatPasswordError('');
    setAgeError('')
    if (rez?.errors) {
      for (let i = 0; i < rez?.errors.length; i++) {
        switch (rez.errors[i].param) {
          case 'age':
            setAgeError('Неверно указан возраст ')
            break;
          case 'password':
            setPasswordError('Неверные данные')
            break;
          case 'login':
            switch (rez.errors[i]?.msg) {
              case 'Invalid value':
                setLoginError('Некорректный логин')
                break;
              case "loginInBase":
                setLoginError('Логин занят')
                break;
              default:
                break
            }
            break
          case 'repeatPassword':
            setRepeatPasswordError('пароли не совпадают')
            break;
          case 'phone':
            switch (rez.errors[i].msg) {
              case 'Invalid value':
                setPhoneErrorr('Неверно набран номер')
                break;
              case 'phoneInBase':
                setPhoneErrorr('Телефон уже занят')
                break;
              default:
                break;
            }  break;
          case 'email':
            switch (rez.errors[i]?.msg) {
              case 'Invalid value':
                setEmaiErrorl('Некорректный email')
                break;
              case "emailInBase":
                setEmaiErrorl('Email занят')
                break;
              default:
                break
            }
          default:
            break;
        }
      }
    } else {
      navigate('/mainpage')
    }
  }

  return (
    <form className={classes.ModalReg}>
      <div className={classes.cont_flex}>
        <div>
          <div className={classes.boxValue}>
            <input className={classes.inputReg} value={user.age} onChange={e => setUser({ ...user, age: e.target.value })} type="text" name="age" placeholder='Возраст' />
            <ErrorDiv value={ageError} />
          </div>
          <select defaultValue={user.gender} onChange={e => setUser({ ...user, gender: e.target.value })} form="gender" id="gender" autoFocus className={classes.gender_select}>
            <option>Пол</option>
            <option value="Male">Мужчина</option>
            <option value="Female">Женщина</option>
          </select>
        </div>
        <div>
          <InputReg value={user.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} type="text" name="first_name" placeholder='Имя' />
          <InputReg value={user.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} type="text" name="last_name" placeholder='Фамилия' />
        </div>
      </div>
      <InputRegWithPicture className={classes.marginTopAndBottom}>
        <img src={loginPic} className='img_1rem' alt='message' />
        <input value={user.login}
          onChange={e => setUser({ ...user, login: e.target.value })}
          className='custom_input'
          placeholder='Логин' />
        <h5 className={classes.redNeed}>*</h5>
        <ErrorDiv customClass={classes.errorDiv_pos} value={loginError} />
      </InputRegWithPicture>
      <InputRegWithPicture className={classes.marginTopAndBottom}>
        <img src={emailPic} className='img_1rem' alt='email' />
        <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} className='custom_input' placeholder='Почта' />
        <h5 className={classes.redNeed}>*</h5>
        <ErrorDiv customClass={classes.errorDiv_pos} value={emailError} />
      </InputRegWithPicture>
      <InputRegWithPicture className={classes.marginTopAndBottom}>
        <img src={lock} className='img_1rem' alt='password' />
        <input value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} className='custom_input' placeholder='Пароль' />
        <h5 className={classes.redNeed}>*</h5>
        <ErrorDiv customClass={classes.errorDiv_pos} value={passwordError} />
      </InputRegWithPicture>
      <InputRegWithPicture className={classes.marginTopAndBottom}>
        <img src={lock} className='img_1rem' alt='repeatPassword' />
        <input value={user.repeatPassword} onChange={e => setUser({ ...user, repeatPassword: e.target.value })} className='custom_input' placeholder='Повторный пароль' />
        <h5 className={classes.redNeed}>*</h5>
        <ErrorDiv customClass={classes.errorDiv_pos} value={repeatPasswordError} />
      </InputRegWithPicture>
      <InputRegWithPicture className={classes.marginTopAndBottom}>
        <img src={phonePic} className='img_1rem' alt='phone' />
        <input value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} className='custom_input' placeholder='Телефон' />
        <ErrorDiv customClass={classes.errorDiv_pos} value={phoneError} />
      </InputRegWithPicture>
      <RegButton
        onClick={e =>
          sendRegInfo(e, store.registration(user))}
        textContent={'Зарегистрироваться'} />
    </form>
  )
}

export default ModalReg
// <RegButton2 onClick={e => e.preventDefault()} id={classes.buttonReg2_pos} textContent={'авторизация'} />