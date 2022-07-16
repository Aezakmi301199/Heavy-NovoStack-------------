import React, { useContext, useState } from 'react'
import RegButton from '../../buttons/RegButton/RegButton';
import RegButton2 from '../../buttons/RegButton2/RegButton2';
import classes from './ModalAuth.module.css'
import close from '../../../../img/close.png'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../App';
import ErrorDiv from '../../errors/ErrorDiv/ErrorDiv';
import InputRegWithPicture from '../../Inputs/InputRegWithPicture/InputRegWithPicture.jsx'
import SucessModal from '../SucessModal/SucessModal';
const ModalAuth = ({ visible, setVisible, ...props }) => {

  const [blockAcc, setBlockAcc] = useState('')
  const [blockModal, setBlockModal] = useState(false)
  console.log(blockAcc)
  const [login, setLoginValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const { store } = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate()
  const preventDefaultAndToLogin = async (e, action) => {
    e.preventDefault();
    let rez = await action
    setLoginError('')
    setPasswordError('')
    if (rez?.errors) {
      console.log(rez.errors)
      console.log(rez.errors[0].param)
      for (let i = 0; i < rez?.errors.length; i++) {
        switch (rez.errors[i].param) {
          case 'password':
            setPasswordError('Неверный пароль')
            break
          case 'login':
            setLoginError('Неверный логин')
            break
          case 'block':
            let blockObject = rez.errors[i]
            setBlockAcc(blockObject.block)
            setBlockModal(true)
            break;
          default:
            break;
        }
      }
    } else {
      setVisible(false)
      setLoginValue('')
      setPasswordValue('')
      navigate('/profile')
    }
  }

  // visible,setVisible,textContent
  return (
    <div
      {...props}
      className={visible ? classes.modalAuth : classes.modalAuthOff}>
      <div className={classes.formContent}>
        <SucessModal visible={blockModal} setVisible={setBlockModal}>
          <div className="marginTop5pxAll">
            <h5>Ваш аккаунт временно заблокирован</h5>
            {blockAcc == undefined
              ? <h5>Причина бана неизвестна.Обратитесь в поддержку</h5>
              : blockAcc?.reason != 'Другое'
                ? <div className="g">
                  <p>Причина блокировки - {blockAcc?.reason}</p>
                </div>
                : blockAcc?.comment_admin
                  ? <div className="g">
                    <h5> Причина блокировки - {blockAcc?.comment_admin}</h5>
                  </div>
                  : <h5>Причина бана неизвестна.Обратитесь в поддержку</h5>}
          </div>
        </SucessModal>
        <div className={classes.info}>
          <label className={classes.cell}>
            <h5>Логин</h5>
            <input
              className={classes.authInput}
              value={login} onChange={(e) => setLoginValue(e.target.value)}
              type="text" placeholder='VatnyaMyaTa' />
            <ErrorDiv value={loginError} className={classes.errorDiv_pos} />
          </label>
          <label className={classes.cell}>
            <h5>Пароль</h5>
            <input
              className={classes.authInput}
              value={password} onChange={(e) => setPasswordValue(e.target.value)}
              type="text" placeholder='VatnyaMyaTa' />
            <ErrorDiv value={passwordError} className={classes.errorDiv_pos} />
          </label>
        </div>
        <div className={classes.auth_line}>
          <RegButton
            onClick={e => preventDefaultAndToLogin(e, store.login(login, password))}
            textContent={'Войти'} />
          <RegButton2
            textContent={'Забыли пароль?'}
            onClick={e => { setVisible(false); navigate('/forgetPassword') }} />
          <RegButton2
            textContent={'Регистрация'}
            onClick={e => { setVisible(false); navigate('/registration') }} />
        </div>
      </div>
      <button className='closeButton'
        onClick={e => { e.preventDefault(); setVisible(false) }}
      ><img src={close} /></button>
    </div>
  )
}

export default ModalAuth

/* onClick={(e) =>preventDefaultAndToLogin(e,/*store.login(login,password)) )} */ 