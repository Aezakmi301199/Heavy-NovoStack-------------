import React, { useContext, useEffect, useState } from 'react'
import classes from './Navbar.module.css'
import logo from '../../img/logo.png'
import profile from '../../img/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import './../../App.css'
import ModalAuth from '../UI/Modals/ModalAuth/ModalAuth'
import { observer } from 'mobx-react-lite';
import { AuthContext } from '../../App'
import InputSearch from '../UI/Inputs/InputSearch/InputSearch'
import { useInputLag } from '../../utils/function'
import axios from 'axios'
import $api from '../../utils/AxiosInterceptors'
import { CSSTransition } from 'react-transition-group'
import RegButton from '../UI/buttons/RegButton/RegButton'
import favorite from '../../img/favorite2.png'
import AdminPanel from '../AdminPanel/AdminPanel'

const Navbar = () => {

  // **********************************************************
  // ? ХУКИ
  const { store } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [findUsers, setFindUsers] = useState([]);
  const [basketCountlength, setBasketCountlength] = useState('')
  const [avatar, setAvatar] = useState('')
  const [burgegCol, setBurderCol] = useState(false)
  const [adminPanel, setAdminPanel] = useState(false)
  // **********************************************************

  // **********************************************************
  // ? ФУНКЦИИ
  const lagSearch = useInputLag(searchUser, 500)
  async function searchUser(userLogin) {
    const users = await axios.get('/findUser', {
      params: { login: userLogin }
    })
    setFindUsers(users.data)
    console.log(users)
  }
  const getAvatar = async () => {
    try {
      store.setLoading(true)
      await $api.get('/avatar').then(res => setAvatar(res.data.avatar))
    } catch (e) {
    } finally {
      store.setLoading(false)
    }
  }
  // **********************************************************

  console.log(store.isAuth)
  console.log(store?.user)
  console.log(store?.user?.roles)

  // let d = JSON.parse(JSON.stringify(store.user.roles))
  // console.log(d)

  useEffect(() => {
    if (store.isAuth) {
      getAvatar()
      store.getBasketCount()
      console.log('__________________________________')


      let roles = store?.user?.roles
      console.log(roles)
      console.log(roles.findIndex(roleObject => roleObject.role == 'admin') != -1)
      if (roles.findIndex(roleObject => roleObject.role == 'admin') != -1) {
        setAdminPanel(true)
      }

    }


  }, [store.isAuth, store.basketCount])
  console.log(adminPanel)

  /*
  
  {store.user.roles.some(role => role.role == 'admin')
          ? <AdminPanel customClass={classes.logo} />
          : <div className={classes.logo}>
            <div className="img_20px20px">
              <img src={logo} alt='logo' />
            </div>
            <Link to="*" className={classes.logo_title} >Тяжеловесы</Link>
          </div>}
  */
  return (
    store.isAuth
      ?
      <div className={classes.navbar}>
        {adminPanel
          ? <AdminPanel />
          : []}
        <div className={classes.logo}>
          <div className="img_20px20px">
            <img src={logo} alt='logo' />
          </div>
          <Link to="/mainpage" className={classes.logo_title} >NovoStack</Link>
        </div>
        <div className={classes.main_nav}>
          <Link to="/mainpage">Главная</Link>
          <Link to="/advertisments">Объявления</Link>
          <Link to="/advertismentCreate">Подать объявление</Link>
          <div className={classes.controlUsers}>
            <InputSearch value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); lagSearch(e.target.value) }}
              placeholder='Поиск по логину' />
            <div className={classes.boxUsers}>
              {findUsers.length > 0
                ? findUsers.map(user =>
                  <div
                    key={user.id} onClick={e => { setSearchQuery(''); setFindUsers([]); navigate(`/profile/${user.id}`) }}
                    className={classes.users}>{user.login}
                  </div>)
                : []}
            </div>
          </div>
          <div className={classes.basket}>
            <div className={store.basketCount ? [classes["navbarCircle"], 'circle'].join(" ") : ''}>
              <h6>{store.basketCount ? store.basketCount : ''}</h6>
            </div>
            <img src={favorite} className={classes.favorite} onClick={e => navigate('/basket')} />
          </div>
        </div>
        <div className={classes.authAndreg}>
          <div className={classes.avatar}>
            {avatar
              ? <img src={avatar} className={burgegCol ? classes.off : classes.on} onClick={e => setBurderCol(true)} />
              // onClick={e => {navigate(`/profile`)}} alt='logo'/>
              : <img src={profile} className={burgegCol ? classes.off : classes.on} onClick={e => setBurderCol(true)} alt='logo' />}
            <CSSTransition in={burgegCol} timeout={350} classNames="alert" unmountOnExit>
              <div className={classes.row}>
                <div className={classes.avatar}>
                  {avatar
                    ? <img src={avatar} onClick={e => setBurderCol(false)} />
                    : <img src={profile} onClick={e => setBurderCol(false)} alt='logo' />
                  }
                </div>
                <RegButton id={classes.marginOFF} textContent={'Профиль'} onClick={e => { navigate('/profile'); setBurderCol(!burgegCol) }}></RegButton>
                <RegButton id={classes.marginOFF} textContent={'Сообщения'} onClick={e => { navigate('/chat'); setBurderCol(!burgegCol) }}></RegButton>
                <RegButton id={classes.marginOFF} textContent={'Объявления'} onClick={e => { navigate('/myadvert'); setBurderCol(!burgegCol) }}></RegButton>
                <RegButton id={classes.marginOFF} textContent={'Настройки'}></RegButton>
                <RegButton id={classes.marginOFF} onClick={e => { navigate('/mainpage'); store.logout() }} textContent={'Выйти'}></RegButton>
              </div>
            </CSSTransition>
          </div>
        </div>
      </div>
      : store.isLoading ?
        <div></div>
        : <div className={classes.navbar}>
          <div className={classes.logo}>
            <div className="img_20px20px">
              <img src={logo} alt='logo' />
            </div>
            <Link to="/mainpage" className={classes.logo_title} >NovoStack</Link>
          </div>
          <div className={classes.main_nav}>
            <Link to="/mainpage">Главная</Link>
            <Link to="/advertisments">Объявления</Link>
            <Link to="/advertismentCreate">Подать объявление</Link>
            <div className={classes.controlUsers}>
              <InputSearch value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); lagSearch(e.target.value) }}
                placeholder='Поиск по логину' />
              <div className={classes.boxUsers}>
                {findUsers.length > 0
                  ? findUsers.map(user =>
                    <div
                      key={user.id} onClick={e => { setSearchQuery(''); setFindUsers([]); navigate(`/profile/${user.id}`) }}
                      className={classes.users}>{user.login}
                    </div>)
                  : []}
              </div>
            </div>
          </div>
          <div className={classes.authAndreg}>
            <Link to="/registration">Регистрация</Link>
            <button style={{ cursor: 'pointer' }} onClick={e => { e.preventDefault(); setModalVisible(true) }}>Войти</button>
          </div>
          <ModalAuth visible={modalVisible} setVisible={setModalVisible} id={classes.modalAuth_pos} />
        </div>
  )

}

export default observer(Navbar)

