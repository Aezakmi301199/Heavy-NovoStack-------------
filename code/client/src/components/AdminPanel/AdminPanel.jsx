import React, { useContext } from 'react'
import classes from './AdminPanel.module.css'
import adminIcon from '../../img/admin.png'
import userIcon from '../../img/team.png'
import car from '../../img/car.png'
import category from '../../img/tech.jpg'
import UniversalModal from '../UI/Modals/UniversalModal/UniversalModal'
import { CSSTransition } from 'react-transition-group';
import { useState } from 'react';
import reports from '../../img/reports.png'
import quest from '../../img/quest.png'
import loginPic from '../../img/profile.png'
import lock from '../../img/lock.png'
import cityPic from '../../img/city.png'
import nameAndFam from '../../img/nameAndFam.png'
import emailPic from '../../img/email.png'
import agePic from '../../img/age.png'
import phonePic from '../../img/phone.png'
import MoreButton from '../UI/buttons/MoreButton/MoreButton';
import InputWithErrorCorrect from '../UI/Inputs/InputWithErrorCorrect/InputWithErrorCorrect'
import InputFromDB from '../UI/Inputs/InputFromDB/InputFromDB'
import $api from '../../utils/AxiosInterceptors'
import { advtMainCritBackST, advtMainCritBooleanST, advtMainCritFrontST, errorValidatorCreateAdvert } from '../../utils/useStateObjects'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
import InputAdminPanelView from '../UI/Inputs/InputAdminPanelView/InputAdminPanelView'
import SuperUniversalModal from '../UI/Modals/SuperUniversalModal/SuperUniversalModal'
import Slider from "rc-slider";
import DopSettingsList from '../UI/Lists/DopSettingsList/DopSettingsList'
import BigAdvertButton from '../UI/buttons/BigAdverButton/BigAdvertButton'
import { useEffect } from 'react'
import { removeItemFromArray, useInputLag } from '../../utils/function'
import FromToSlider from '../UI/FromToSlider/FromToSlider'
import InputSearch from '../UI/Inputs/InputSearch/InputSearch'
import axios from 'axios'
import InputRegWithPicture from '../UI/Inputs/InputRegWithPicture/InputRegWithPicture'
import ErrorDiv from '../UI/errors/ErrorDiv/ErrorDiv'
import InputFile from '../UI/Inputs/InputFile/InputFile'
import Report from '../UI/Report/Report'

const AdminPanel = ({ customClass, ...props }) => {

  // * *****************************************
  // ? ХУКИ
  const navigate = useNavigate()
  const { store } = useContext(AuthContext)
  const [searchOptionBack, setSearchOptionBack] = useState(advtMainCritBackST)
  const [expostion, setExposition] = useState('')
  const [searchOptionFrontSAVED, setSearchOptionFrontSAVED] = useState(advtMainCritFrontST)
  const [searchOptionFront, setSearchOptionFront] = useState(advtMainCritFrontST)
  const [searchOptionBoolean, setFrontSearchBoolean] = useState(advtMainCritBooleanST)
  const [errorValidator, setErrorValidator] = useState({ ...errorValidatorCreateAdvert, save: '' });
  const [searchOptionDOPFrontSAVED, setSearchOptionDOPFrontSAVED] = useState({})
  const [authError, setAuthError] = useState(false)
  const [pictures, setPictures] = useState([])
  const [countComplReports, setCountComplReports] = useState('')
  const [dopSettings, setDopSettings] = useState(false)
  const [createModal, setCreateModal] = useState(false)
  const [updateModal, setUpdateModal] = useState(false)
  const [categoryPanel, setCategoryPanel] = useState(false)
  const [reportsPanel, setReportsPanel] = useState(false)
  const [userPanel, setUserPanel] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userBack, setUserBack] = useState({ findUsers: [], selectedUser: {} })
  const [userModal, setUserModal] = useState(false)
  const [categoryCount, setCategoryCount] = useState('')
  const [userCount, setUserCount] = useState('')
  const [builderCategory, setBuilderCategory] = useState({ category: '', inputString: [], inputNumber: [], brand: [], pictures: {}, previewPic: '' })
  const [builderCategoryError, setBuilderCategoryError] = useState({ category: '', inputString: [], inputNumber: [], brand: [], pictures: '' })
  const [user, setUser] = useState({ login: '', email: '', phone: '', password: '', repeatPassword: '', age: '', gender: '', first_name: '', last_name: '', city: '', country: '', roles: [] })
  const [updateUserModal, setUpdateUserModal] = useState(false)
  const [loginError, setLoginError] = useState('');
  const [roles, setRoles] = useState([])
  const [statusUser, setStatusUser] = useState([{ name: 'Активен', status: true }, { name: 'Заблокирован', status: false }])
  const [emailError, setEmaiErrorl] = useState('');
  const [phoneError, setPhoneErrorr] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [backError, setBackError] = useState({ adminErrorDelete: '' });
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [backReports, setBackReports] = useState([])
  // * *****************************************
  console.log(statusUser)
  console.log(userBack)
  const lagSearch = useInputLag(searchUser, 500)

  async function searchUser(userLogin) {
    const users = await axios.get('/findUser', {
      params: { login: userLogin }
    })
    console.log(users)
    setUserBack({ ...userBack, findUsers: [...users.data] })
  }

  const getCompletedReports = async () => {
    await $api.get('/reportscompleted').then(e => { setCountComplReports(e.data) })
  }

  const getReports = async () => {
    // setBackReports(e.data)
    await $api.get('/reports').then(e => { setBackReports(e.data); console.log(e.data) })
  }

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
      setUser({ login: '', email: '', phone: '', password: '', repeatPassword: '', age: '', gender: '', first_name: '', last_name: '', city: '', country: '', roles: [] })
      setLoginError('');
      setEmaiErrorl('');
      setPhoneErrorr('');
      setPasswordError('');
      setRepeatPasswordError('');
      setAgeError('')
      setUserCount(prev => prev + 1)
      setUserModal(false)
    }
  }

  const previewPic = (picture) => {
    console.log(picture)
    let reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onloadend = function () {
      let previewPic = { id: picture.lastModified, path: reader.result, name: picture.name };

      setBuilderCategory({ ...builderCategory, previewPic: previewPic, pictures: picture })
    }
  }

  const sendSearchOption = async (searchOptionView, criterieSetting, changedSearch) => {
    console.log(changedSearch)
    if (changedSearch == true) {
      searchOptionView = { ...searchOptionView, [criterieSetting]: changedSearch }
      await $api.post('/advertisments', searchOptionView)
        .then(res => {
          setFrontSearchBoolean({ ...searchOptionBoolean, [criterieSetting]: changedSearch })
          setSearchOptionFront({ ...searchOptionFront, ...res.data })
          setSearchOptionFrontSAVED({ ...searchOptionFront, ...res.data })
        })
    } else {
      searchOptionView = { ...searchOptionView, [criterieSetting]: changedSearch }
      await $api.post('/advertisments', searchOptionView)
        .then(res => {
          console.log('КАТЕ')
          setFrontSearchBoolean({ ...searchOptionBoolean, dopSettings: true })
          setSearchOptionFront({ ...searchOptionFront, ...res.data })
          setSearchOptionFrontSAVED({ ...searchOptionFront, ...res.data })
          let errors = {}
          res.data.dopSettings.forEach(dopS => errors = { ...errors, [dopS.subcategory]: '' })
          let d = res.data.dopSettings.forEach(dopS => errors = { ...errors, [dopS.subcategory]: '' })
          console.log(d)
          setErrorValidator({ ...errorValidatorCreateAdvert, ...errors })
        })
    }
  }

  const getCategoryCount = async () => {
    await $api.get('/categoryCount').then((res) => { setCategoryCount(res.data) })
  }

  const getUserCount = async () => {
    await $api.get('/userCount').then((res) => { setUserCount(res.data) })
  }
  const resetShowAndPassOne = (passOne) => {
    setUserPanel(false);
    setCategoryPanel(false);
    setReportsPanel(false)
    switch (passOne) {
      case 'user':
        setUserPanel(true)
        break;
      case 'category':
        setCategoryPanel(true)
        break;
      case 'reports':
        setReportsPanel(true)
        break;
      default:
        break;
    }

  }
  const deleteCategory = async (category) => {
    if (typeof (category) == 'string' && category != '') {
      await $api.delete(`/category/${category}`).then((res) => {
        setSearchOptionBack({ ...searchOptionBack, category: '' })
        setSearchOptionFront({ ...searchOptionFront, category: '' })
        setCategoryCount(prev => prev - 1)
      }) // { setCategoryCount(res.data)}
    }
  }
  console.log(builderCategory)
  const createCategory = async (builderCategory) => {
    console.log(builderCategoryError)
    console.log(builderCategory)
    console.log('ss')

    try {
      let category = new FormData();
      delete builderCategory.previewPic
      category.append('pictures', builderCategory.pictures ? builderCategory.pictures : '')
      category.append('category', JSON.stringify(builderCategory));

      await $api.post(`/category`, category)
      setBuilderCategory({ category: '', inputString: [], inputNumber: [], brand: [] })
      setBuilderCategoryError({ category: '', inputString: [], inputNumber: [], brand: [] })
      setCreateModal(!createModal)
      setCategoryCount(prev => prev - 1)
    } catch (e) {
      console.log(builderCategoryError)
      console.log(builderCategory)
      console.log(e.response.data.erros)
      setBuilderCategoryError(e.response.data.erros)
      console.log('IA')
    }
  }
  console.log(roles)
  console.log(user)
  const updateCategory = async (builderCategory) => {
    console.log(builderCategory)
    try {
      //      let inputString = builderCategory.inputString
      //      .filter(inputString => (inputString.id < 100000 && inputString.spares != undefined) || inputString.id > 100000 || inputString == '')

      //  console.log({ ...builderCategory, inputString: inputString, category: searchOptionBack.category })
      await $api.put(`/category`, { ...builderCategory, category: searchOptionBack.category })
      setBuilderCategory({ category: '', inputString: [], inputNumber: [], brand: [] })
      setBuilderCategoryError({ category: '', inputString: [], inputNumber: [], brand: [] })
      setUpdateModal(!updateModal)
    } catch (e) {
      console.log(e.response.data.erros)
      console.log(e.response.data.erros.inputNumber)
      console.log(builderCategoryError)
      setBuilderCategoryError(e.response.data.erros)
      console.log(builderCategory.inputString)
      console.log(builderCategoryError.inputString.findIndex(err => err.idx == 2))
      console.log('IA')
    }

  }
  console.log(userBack.selectedUser.hasOwnProperty('roles'))
  console.log(userBack.selectedUser)
  console.log(userBack)
  const getRolesByUser = async (id) => {
    console.log(userBack)

    console.log(id)
    try {
      let oldRoles = await $api.get(`/userrole/${id}`)
      let status = await $api.get(`/statusUser/${id}`)
      oldRoles = oldRoles.data.filter(r => r.role != 'user')
      status = status.data.status
      console.log(status)
      setUserBack({ ...userBack, selectedUser: { ...userBack.selectedUser, roles: oldRoles, status: status } })
    } catch (e) {
      console.log(e.response.data)
      console.log('IA')
    }
  }
  const sortBySubcategoryType = (massive = []) => {
    let inputString = massive.filter(input => input.subcategorytype == 'string')
    let inputNumber = massive.filter(input => input.subcategorytype == 'number')
    return { inputNumber, inputString }
  }

  const findAllRole = async () => {
    try {
      let roles = await $api.get(`/allrole`)
      roles = roles.data.filter(r => r.role != 'user')
      console.log(roles)
      setRoles(roles)
    } catch (e) {
      console.log(e.response.data)
      console.log('IA')
    }
  }
  const blockUser = async (id) => {
    try {
      setBackError({ adminErrorDelete: '' })
      let roles = await $api.put(`/blockUser/${id}`)
    } catch (e) {
      console.log(e.response.data)
      setBackError({ ...backError, adminErrorDelete: e.response.data.message })
      console.log('IA')
    }
  }
  const updateUser = async (user) => {
    try {
      let roles = await $api.put(`/updateRoleAndStatus`, user)
    } catch (e) {
      console.log(e.response.data)
      console.log('IA')
    }
  }
  // const [builderCategoryError, setBuilderCategoryError] = useState({ category: '', inputString: [], inputNumber: [] })
  console.log('SPASI')
  console.log(categoryCount)
  console.log(searchOptionBack)
  const [modalPanel, setModalPanel] = useState(false)

  useEffect(() => {
    getCategoryCount()
    getUserCount()
  }, [categoryCount])

  useEffect(() => {
    if (updateModal) {
      let { inputNumber, inputString } = sortBySubcategoryType(searchOptionFront.dopSettings)
      setBuilderCategory({
        ...builderCategory,
        inputNumber: [...builderCategory.inputNumber, ...inputNumber],
        inputString: [...builderCategory.inputString, ...inputString]
      })
    }
  }, [updateModal])
  console.log(userBack)

  console.log(searchOptionBack)
  console.log(builderCategory)
  console.log(searchOptionDOPFrontSAVED)
  console.log(searchOptionFront)
  // classes.adminPanel
  return (

    <div
      className={customClass
        ? [customClass, classes['adminPanel']].join(' ')
        : modalPanel == true
          ? [classes['adminPanelAllWidth'], classes['adminPanel']].join(' ')
          : classes.adminPanel}
      {...props}>
      {!modalPanel
        ? <img
          onClick={e => { setModalPanel(!modalPanel); resetShowAndPassOne('category') }}
          src={adminIcon}
          id={classes.img20px20px} />
        : <div className='row'>
          <div
            onClick={e => resetShowAndPassOne('category')}
            className={[classes['miniPanel'], 'flexColumnAlignJustifyCenter'].join(' ')}>
            <img
              src={car}
              id={classes.img20px20px} />
            <h6>Категории</h6>
          </div>
          <div
            onClick={e => {
              resetShowAndPassOne('user');
              if (roles.length == 0) {
                findAllRole()
              }
            }}
            className={[classes['miniPanel'], 'flexColumnAlignJustifyCenter'].join(' ')}>
            <img
              src={userIcon}
              id={classes.img20px20px} />
            <h6>Пользователи</h6>
          </div>
          <div
            onClick={e => {
              resetShowAndPassOne('reports');
              getReports()
              getCompletedReports()
            }}
            className={[classes['miniPanel'], 'flexColumnAlignJustifyCenter'].join(' ')}>
            <img
              src={reports}
              id={classes.img20px20px} />
            <h6>Жалобы</h6>
          </div>
        </div>}
      <img src='' />
      <CSSTransition
        classNames="list-transition"
        unmountOnExit
        appear
        in={modalPanel}
        timeout={15500}
      >

        <SuperUniversalModal
          visible={modalPanel}
          setVisible={setModalPanel}
          id={'gainsboroRelative'} >
          <div className="">
            {categoryPanel
              ? <div className={classes.line}>
                <div className={classes.row}>
                  <InputAdminPanelView
                    textContent={'Поиск брендов по категории'}
                    searchInBaseBy={'brand'}
                    criterieSetting={'category'}
                    sendSearchOption={sendSearchOption}
                    searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
                    searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
                    searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
                    searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
                    errorValidatorCriterieSetting={errorValidator.category}
                  />
                  {searchOptionBack.category == ''
                    ? <MoreButton textContent={'Добавить категорию'} onClick={e => setCreateModal(!createModal)} />
                    : ''}
                  {searchOptionBack.category
                    ? <MoreButton
                      textContent={'Обновить категорию'}
                      onClick={e => setUpdateModal(!updateModal)} />
                    : ''}
                  {searchOptionBack.category
                    ? <MoreButton
                      textContent={'Удалить категорию'}
                      onClick={e => deleteCategory(searchOptionBack.category)} />
                    : ''}
                  <MoreButton textContent={'Идеи улучшений'} />
                  {searchOptionBack.category
                    ? <MoreButton
                      onClick={e => setDopSettings(!dopSettings)}
                      textContent={'Просмотр доп.настроек категории'} />
                    : ''}

                  <SuperUniversalModal
                    id='gainsboro'
                    visible={dopSettings}
                    setVisible={setDopSettings}>
                    <div className="">
                      {Array.isArray(searchOptionFront.dopSettings)
                        ? searchOptionFront.dopSettings.length > 0
                          ? <DopSettingsList id={classes.r3}>
                            {searchOptionFront.dopSettings.map((set, idx) => {
                              if (set.subcategorytype == 'string') {
                                console.log('СТРОКА')
                                return <div key={set.id}>
                                  <p> {set.subcategory}  {set.unit ? `- ${set.unit}` : ''}</p>
                                  <InputFromDB
                                    id={classes.inputFromDBInDop}
                                    criterieSetting={set.subcategory}
                                    sendSearchOption={sendSearchOption}
                                    searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
                                    searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
                                    searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
                                    searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
                                    error={errorValidator[set.subcategory]}
                                  />
                                </div>
                              } else {
                                let min = set.min
                                let max = set.max
                                return <div key={set.id}>
                                  <p>{set.subcategory}</p>
                                  <Slider id={classes.r2}
                                    range
                                    marks={{
                                      [min]: `${set.min} ${set.unit} `,
                                      [max]: `${set.max} ${set.unit} `
                                    }}
                                    min={searchOptionFrontSAVED.dopSettings[idx].min}
                                    max={searchOptionFrontSAVED.dopSettings[idx].max}
                                    tipProps={{
                                      placement: "top",
                                      visible: true

                                    }}
                                    defaultValue={[set.min, set.max]}
                                    onChange={e => {
                                      let stDops = searchOptionFront.dopSettings.filter(st => st.id != set.id)
                                      stDops.splice(idx, 0, { ...set, id: set.id, min: e[0], max: e[1] })
                                      setSearchOptionFront({ ...searchOptionFront, dopSettings: stDops })
                                      // setSearchOptionBack({...searchOptionBack,dopSettings:stDops})
                                    }}

                                  />
                                </div>
                              }
                            }
                            )}
                          </DopSettingsList>
                          : <h5>Доп.настройки отсутствуют</h5>
                        : ''
                      }
                    </div>
                  </SuperUniversalModal>

                  <SuperUniversalModal
                    onClickFirstButton={e => updateCategory(builderCategory)}
                    onClickCancel={e => {

                      setBuilderCategory({ category: '', inputString: [], inputNumber: [], brand: [] })
                      setBuilderCategoryError({ category: '', inputString: [], inputNumber: [], brand: [] })
                      setUpdateModal(!updateModal);
                    }}
                    textContent={'Обновить категорию'}
                    crud={true}
                    id={classes.gainsboroAndPadding20px}
                    visible={updateModal}
                    setVisible={setUpdateModal}>
                    <div className='left_side'>
                      <div className="marginTop10pxAll">
                        <h3>Категория</h3>
                        <InputWithErrorCorrect
                          readOnly={true}
                          customClass={classes.imitSelectCategory}
                          value={searchOptionBack.category}
                          valueError={errorValidator.category}
                        // onChange={e => setSearchOptionBack({ ...setSearchOptionBack, category: e.target.value })}
                        />
                      </div>
                      <div className="">
                        <BigAdvertButton
                          textContent={'Добавить кнопку с числовой информацией'}
                          onClick={e => setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber, e.target.value] })} />
                        {builderCategory.inputNumber.length > 0
                          ? <div
                            className={classes.mxh250px}
                            id={builderCategory.inputNumber.length > 2 ? 'overflow' : 'overflowOFF'}>
                            {builderCategory.inputNumber.map((inputNumber, idx) => {
                              console.log(inputNumber)
                              console.log(idx)
                              console.log(builderCategory)
                              console.log(builderCategoryError)



                              return <FromToSlider
                                valueNumberError={inputNumber?.id
                                  ? builderCategoryError.inputNumber.findIndex(input => input.id == inputNumber.id) != -1
                                    ? builderCategoryError.inputNumber[builderCategoryError.inputNumber.findIndex(input => input.id == inputNumber.id)]
                                    : ''
                                  : ''}
                                crud={true}
                                key={idx}
                                keyFromMs={idx}
                                idx={inputNumber?.id ? inputNumber.id : Date.now()}
                                builderCategory={builderCategory}
                                setBuilderCategory={setBuilderCategory}
                              />
                            })}
                          </div>

                          : ''}
                      </div>
                      <div className="">
                        <BigAdvertButton
                          textContent={'Добавить кнопку с строчной информацией'}
                          onClick={e => setBuilderCategory({ ...builderCategory, inputString: [...builderCategory.inputString, e.target.value] })} />
                      </div>

                      {builderCategory.inputString.length > 0
                        ? <div
                          className={[classes['mxh250px'], 'flexRowJustifySpaceBetweenWrap'].join(' ')}
                          id={builderCategory.inputString.length > 4 ? 'overflow' : 'overflowOFF'}>
                          {builderCategory.inputString.map((inputString, idx) => {
                            console.log(builderCategoryError?.inputString[idx]?.valueError)
                            console.log(builderCategoryError?.inputString[idx])
                            console.log('CHECKING')
                            console.log(builderCategory.inputString)
                            console.log(builderCategory.inputString.length)
                            console.log(idx)
                            console.log(builderCategory)
                            //       builderCategoryError.inputString[builderCategoryError.inputString.findIndex(err => err.idx == inputString?.id || err == Date.now()) != -1].valueError
                            console.log(builderCategoryError)
                            return <InputFromDB
                              searchOptionBack={searchOptionBack} setSearchOptionBack={setSearchOptionBack}
                              searchOptionFront={searchOptionFront} setSearchOptionFront={setSearchOptionFront}
                              searchOptionFrontSAVED={searchOptionFrontSAVED} setSearchOptionFrontSAVED={setSearchOptionFrontSAVED}
                              searchOptionBoolean={searchOptionBoolean} setFrontSearchBoolean={setFrontSearchBoolean}
                              sendSearchOption={sendSearchOption}
                              criterieSetting={inputString.subcategory}
                              error={builderCategoryError.inputString.findIndex(err => err.idx == inputString?.id) != -1
                                ? ''
                                : ''}
                              customClass={classes.mx250px}
                              crud={true}
                              key={idx}
                              keyFromMs={idx}
                              idx={inputString?.id ? inputString.id : Date.now()}
                              builderCategory={builderCategory}
                              setBuilderCategory={setBuilderCategory} />
                          })}
                        </div>
                        : ''}
                    </div>
                  </SuperUniversalModal>

                  <SuperUniversalModal
                    onClickFirstButton={e => createCategory(builderCategory)}
                    textContent={'Создать категорию'}
                    crud={true}
                    id={classes.gainsboroAndPadding20px}
                    visible={createModal}
                    setVisible={setCreateModal}>
                    <div className='left_side'>
                      <div className="marginTop10pxAll">
                        <h3>Категория</h3>
                        <InputWithErrorCorrect
                          customClass={classes.imitSelectCategory}
                          value={builderCategory.category}
                          valueError={builderCategoryError.category}
                          onChange={e => setBuilderCategory({ ...builderCategory, category: e.target.value })} />
                      </div>
                      <BigAdvertButton
                        textContent={'Добавить кнопку с числовой информацией'}
                        onClick={e => setBuilderCategory({ ...builderCategory, inputNumber: [...builderCategory.inputNumber, e.target.value] })} />
                      {builderCategory.inputNumber.length > 0
                        ? <div
                          className={classes.mxh250px}
                          id={builderCategory.inputNumber.length > 2 ? 'overflow' : 'overflowOFF'}>
                          {builderCategory.inputNumber.map((inputNumber, idx) => {
                            console.log(inputNumber)
                            console.log(builderCategoryError)
                            console.log(idx)
                            console.log(builderCategory)
                            console.log(builderCategoryError)
                            let rez = inputNumber?.id ? builderCategoryError.inputNumber.findIndex(input => input.id == inputNumber.id) : ''
                            console.log(rez)
                            return <FromToSlider
                              valueNumberError={inputNumber?.id
                                ? builderCategoryError.inputNumber.findIndex(input => input.id == inputNumber.id) != -1
                                  ? builderCategoryError.inputNumber[builderCategoryError.inputNumber.findIndex(input => input.id == inputNumber.id)]
                                  : ''
                                : ''}
                              crud={true}
                              key={idx}
                              keyFromMs={idx}
                              idx={inputNumber?.id ? inputNumber.id : Date.now()}
                              builderCategory={builderCategory}
                              setBuilderCategory={setBuilderCategory}
                            />
                          })}
                        </div>
                        : ''}

                      <BigAdvertButton
                        textContent={'Добавить кнопку с строчной информацией'}
                        onClick={e => setBuilderCategory({ ...builderCategory, inputString: [...builderCategory.inputString, e.target.value] })} />

                      {builderCategory.inputString.length > 0
                        ? <div
                          className={[classes['mxh250px'], 'flexRowJustifySpaceBetweenWrap'].join(' ')}
                          id={builderCategory.inputString.length > 4 ? 'overflow' : 'overflowOFF'}>
                          {builderCategory.inputString.map((inputString, idx) => {
                            console.log('CHECKING')
                            console.log(builderCategory.inputString)
                            console.log(builderCategory.inputString.length)
                            console.log(idx)
                            console.log(builderCategory)
                            console.log(builderCategoryError)
                            console.log(inputString)
                            return <InputFromDB
                              error={inputString?.id
                                ? builderCategoryError.inputString.findIndex(input => input.id == inputString.id) != -1
                                  ? builderCategoryError.inputString[builderCategoryError.inputString.findIndex(input => input.id == inputString.id)].valueError
                                  : ''
                                : ''}
                              customClass={classes.mx250px}
                              crud={true}
                              key={idx}
                              keyFromMs={idx}
                              idx={inputString?.id ? inputString.id : Date.now()}
                              builderCategory={builderCategory}
                              setBuilderCategory={setBuilderCategory} />
                          })}
                        </div>
                        : ''}
                      <div className='bottom flexRowJustifySpaceBetweenWrap'>
                        <div>
                          <InputFromDB
                            error={builderCategoryError.brand
                              ? builderCategoryError.brand
                              : ''}
                            cru={true}
                            cruObj={{ placeholder: 'Бренд', value: '', name: 'brand', ms: builderCategory.brand }}
                            //  idx={inputNumber?.id ? inputNumber.id : Date.now()}
                            builderCategory={builderCategory}
                            setBuilderCategory={setBuilderCategory} />
                        </div>
                        <div className='flexColumnAlignCenter'>
                          {builderCategory.previewPic
                            ? <div className='container10rem10rem flexRowAlignJustifyCenter'>
                              <img src={builderCategory?.previewPic?.path} className='width95perheight75per' />
                            </div>
                            : <div className='container10rem10rem flexRowAlignJustifyCenter'>
                              <img src={quest} className='width95perheight75per' />
                            </div>
                          }
                          <h5>Загрузить фото</h5>
                          <InputFile
                            type='file'
                            accept=".jpg, .jpeg, .png"
                            name="filefield"
                            item={builderCategory?.pictures}
                            onChange={e => {
                              console.log(e.target.files[0])
                              previewPic(e.target.files[0])
                            }}
                          />
                          <ErrorDiv value={builderCategoryError.pictures} />
                        </div>
                      </div>
                    </div>
                  </SuperUniversalModal>


                </div>
                <div className={classes.row} id={classes.r3}>
                  <div className="flexColumnAlignJustifyCenter marginTop5pxAll">
                    <h6 className='textCenter'>Количество категорий</h6>
                    <p className='colorBlue'>{categoryCount}</p>
                    <img src={category} className={'img10rem'} />
                  </div>
                </div>
              </div>
              : ''}

            {userPanel
              ? <div className={classes.line}>
                <div className={classes.row}>
                  <div className={classes.controlUsers}>
                    <InputSearch value={userBack.selectedUser?.login ? userBack.selectedUser.login : searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        lagSearch(e.target.value)
                      }}
                      onClick={e => {
                        setSearchQuery('');
                        setBackError({ adminErrorDelete: '' })
                        setUserBack({ findUsers: [], searchUser: '', selectedUser: {} })
                      }}
                      placeholder='Поиск по логину' />
                    <div className={classes.boxUsers}>
                      {userBack.findUsers.length > 0
                        ? userBack.findUsers.map(user =>
                          <div
                            key={user.id} onClick={e => {
                              console.log(user)
                              setUserBack({ findUsers: [], searchUser: '', selectedUser: user })
                            }}
                            className={classes.users}>{user.login}
                          </div>)
                        : []}
                    </div>
                  </div>
                  <MoreButton
                    textContent={'Создать пользователя'}
                    onClick={e => setUserModal(!userModal)} />
                  {userBack.selectedUser?.login
                    ? <MoreButton
                      textContent={'Изменить состояние пользователя'}
                      onClick={e => { setUpdateUserModal(true); getRolesByUser(userBack.selectedUser.id) }} />
                    : ''}

                  <SuperUniversalModal
                    onClickFirstButton={e => updateUser(userBack.selectedUser)}
                    textContent={'Обновить пользователя'}
                    crud={true}
                    id={classes.blackAndPadding20px}
                    visible={updateUserModal}
                    setVisible={setUpdateUserModal}>
                    <div className='left_side'>
                      <div className="marginTop30px">
                        <h5 className='colorWhite'>Состояние аккаунта</h5>
                        {statusUser.map(status => <div
                          key={status.name}
                          onClick={e => setUserBack({ ...userBack, selectedUser: { ...userBack.selectedUser, status: status.status } })}
                          className='flexRowAlignCenter marginLeftRight5pxAll'>
                          <input type='radio'
                            checked={userBack.selectedUser?.status == status.status
                              ? true
                              : false}
                            onChange={e => { }}
                            value={status} name='status' />
                          <label id='unClickableDiv' className='colorWhite'>{status.name}</label>
                        </div>)}
                        <div className={[classes['roles'], 'flexRowJustifySpaceBetweenWrap'].join(' ')}>
                          <h5 className='colorWhite'>Роли пользователя</h5>
                          {userBack.selectedUser.hasOwnProperty('roles')
                            ? roles.map(roleFromArray => {
                              console.log(roles)
                              let id = roleFromArray.id;
                              let role = roleFromArray.role
                              console.log(role)
                              return <div
                                key={id}
                                id='cursorPointer'
                                className='marginLeftRight5pxAll flexRowAlignJustifyCenter'
                                onClick={e => {
                                  console.log(userBack.selectedUser?.roles.findIndex(role => role.id == id) != -1)

                                  if (userBack.selectedUser.roles.findIndex(role => role.id == id) != -1) {
                                    const filteredRole = userBack.selectedUser.roles.filter(role => role.id != id)
                                    console.log(filteredRole)
                                    console.log({ ...userBack, selectedUser: { ...userBack.selectedUser, roles: filteredRole } })
                                    setUserBack({ ...userBack, selectedUser: { ...userBack.selectedUser, roles: filteredRole } })
                                  } else {

                                    setUserBack({ ...userBack, selectedUser: { ...userBack.selectedUser, roles: [...userBack.selectedUser.roles, roleFromArray] } })
                                  }



                                }}
                              >
                                <input type='checkbox'
                                  id={'unClickableDiv'}
                                  checked={userBack.selectedUser.roles.findIndex(r => r.id == id) != -1
                                    ? true
                                    : false}
                                  onChange={e => { }} />
                                <label id='unClickableDiv' htmlFor={role}>{role}</label>
                              </div>
                            })
                            : ''}
                        </div>

                      </div>
                    </div>
                  </SuperUniversalModal>

                  {userBack.selectedUser?.login
                    ? <InputWithErrorCorrect valueError={backError.adminErrorDelete}>
                      <MoreButton
                        textContent={'Заблокировать пользователя'}
                        onClick={e => blockUser(userBack.selectedUser.id)} />
                    </InputWithErrorCorrect>
                    : ''}
                  <MoreButton textContent={'Идеи улучшений'} />
                  {searchOptionBack.category
                    ? <MoreButton
                      onClick={e => setDopSettings(!dopSettings)}
                      textContent={'Просмотр доп.настроек категории'} />
                    : ''}


                  <SuperUniversalModal
                    onClickFirstButton={e => sendRegInfo(e, store.registration(user))}
                    textContent={'Создать пользователя'}
                    crud={true}
                    id={classes.blackAndPadding20px}
                    visible={userModal}

                    setVisible={setUserModal}>
                    <div className='left_side'>
                      <div className="flexRowJustifySpaceBetweenWrap marginTop30px">
                        <InputRegWithPicture className={classes.width150px}>
                          <img src={loginPic} className='img_1rem' alt='login' />
                          <input value={user.login} onChange={e => setUser({ ...user, login: e.target.value })} className='custom_input' placeholder='Логин' />
                          <h5 className={classes.redNeed}>*</h5>
                          <ErrorDiv customClass={classes.errorDiv_pos} value={loginError} />
                        </InputRegWithPicture>
                        <InputRegWithPicture className={classes.width150px}>
                          <img src={emailPic} className='img_1rem' alt='email' />
                          <input value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} className='custom_input' placeholder='Почта' />
                          <h5 className={classes.redNeed}>*</h5>
                          <ErrorDiv customClass={classes.errorDiv_pos} value={emailError} />
                        </InputRegWithPicture>

                        <InputRegWithPicture className={classes.width150px}>
                          <img src={lock} className='img_1rem' alt='password' />
                          <input value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} className='custom_input' placeholder='Пароль' />
                          <h5 className={classes.redNeed}>*</h5>
                          <ErrorDiv customClass={classes.errorDiv_pos} value={passwordError} />
                        </InputRegWithPicture>

                        <InputRegWithPicture className={classes.width150px}>
                          <img src={lock} className='img_1rem' alt='repeatPassword' />
                          <input value={user.repeatPassword} onChange={e => setUser({ ...user, repeatPassword: e.target.value })} className='custom_input' placeholder='Повторный пароль' />
                          <h5 className={classes.redNeed}>*</h5>
                          <ErrorDiv customClass={classes.errorDiv_pos} value={repeatPasswordError} />
                        </InputRegWithPicture>

                        <InputRegWithPicture className={classes.width150px}>
                          <img src={phonePic} className='img_1rem' alt='phone' />
                          <input value={user.phone} onChange={e => setUser({ ...user, phone: e.target.value })} className='custom_input' placeholder='Телефон' />
                          <ErrorDiv customClass={classes.errorDiv_pos} value={phoneError} />
                        </InputRegWithPicture>

                        <InputRegWithPicture className={classes.width150px}>
                          <img src={agePic} className='img_1rem' alt='age' />
                          <input value={user.age} onChange={e => setUser({ ...user, age: e.target.value })} type="text" className='custom_input' name="age" placeholder='Возраст' />
                          <ErrorDiv customClass={classes.errorDiv_pos} value={ageError} />
                        </InputRegWithPicture>


                        <InputRegWithPicture className={classes.width150px}>
                          <img src={nameAndFam} className='img_1rem' alt='first_name' />
                          <input value={user.first_name} onChange={e => setUser({ ...user, first_name: e.target.value })} type="text" className='custom_input' name="first_name" placeholder='Имя' />
                          <ErrorDiv customClass={classes.errorDiv_pos} value='' />
                        </InputRegWithPicture>

                        <InputRegWithPicture className={classes.width150px}>
                          <img src={nameAndFam} className='img_1rem' alt='last_name' />
                          <input value={user.last_name} onChange={e => setUser({ ...user, last_name: e.target.value })} type="text" className='custom_input' name="last_name" placeholder='Фамилия' />
                          <ErrorDiv customClass={classes.errorDiv_pos} value='' />
                        </InputRegWithPicture>


                        <InputRegWithPicture className={classes.width150px}>
                          <img src={cityPic} className='img_1rem' alt='city' />
                          <input
                            value={user.country}
                            onChange={e => setUser({ ...user, country: e.target.value })} type="text" className='custom_input' placeholder='Страна' />
                          <ErrorDiv customClass={classes.errorDiv_pos} value='' />
                        </InputRegWithPicture>
                        <InputRegWithPicture className={classes.width150px}>
                          <img src={cityPic} className='img_1rem' alt='city' />
                          <input
                            value={user.city}
                            onChange={e => setUser({ ...user, city: e.target.value })} type="text" className='custom_input' name="last_name" placeholder='Город' />
                          <ErrorDiv customClass={classes.errorDiv_pos} value='' />
                        </InputRegWithPicture>
                        <select defaultValue={user.gender} onChange={e => setUser({ ...user, gender: e.target.value })} form="gender" id="gender" autoFocus className={classes.gender_select}>
                          <option>Пол</option>
                          <option value="Male">Мужчина</option>
                          <option value="Female">Женщина</option>
                        </select>
                        <div className={[classes['roles'], 'flexRowJustifySpaceBetweenWrap'].join(' ')}>
                          <h5 className='colorWhite'>Роли пользователя</h5>
                          {roles.length > 0
                            ? roles.map(roleFromArray => {
                              let id = roleFromArray.id;
                              let role = roleFromArray.role
                              console.log(role)
                              return <div
                                key={id}
                                id='cursorPointer'
                                className='marginLeftRight5pxAll flexRowAlignJustifyCenter'
                                onClick={e => {
                                  if (user.roles.findIndex(roleID => roleID == id) != -1) {
                                    const filteredRoleID = user.roles.filter(roleID => roleID != id)
                                    console.log(filteredRoleID)
                                    setUser({ ...user, roles: filteredRoleID })
                                  } else {
                                    console.log(role)
                                    setUser({ ...user, roles: [...user.roles, id] })
                                  }
                                }}
                              >
                                <input id={'unClickableDiv'} type='checkbox'
                                  checked={user.roles.findIndex(roleID => roleID == id) != -1
                                    ? true
                                    : false}
                                  onChange={e => { }} />
                                <label id={'unClickableDiv'} htmlFor={role}>{role}</label>
                              </div>
                            })
                            : ''}
                        </div>

                      </div>
                    </div>
                  </SuperUniversalModal>


                </div>
                <div className={classes.row} id={classes.r3}>
                  <div className="flexColumnAlignJustifyCenter marginTop5pxAll">
                    <h6 className='textCenter'>Количество пользователей</h6>
                    <p className='colorBlue'>{userCount}</p>
                    <img src={loginPic} className={'img10rem'} />
                  </div>
                </div>
              </div>
              : ''}

            {reportsPanel
              ? <div className={classes.line}>
                <div className={classes.row}>
                  {backReports.length > 0
                    ? backReports.map(report => <Report modalPanel={modalPanel} setModalPanel={setModalPanel} key={report.id} report={report} />)
                    : <div className='width10rem'><h2 className='textCenter'>Жалоб нет</h2> </div>
                  }
                </div>
                <div className={classes.row} id={classes.r3}>
                  <div className="flexColumnAlignJustifyCenter marginTop5pxAll">
                    <h6 className='textCenter'>Решенные жалобы</h6>
                    <p className='textCenter colorBlue'>{countComplReports != '' ? countComplReports : 0}</p>
                    <img src={loginPic} className={'img10rem'} />
                  </div>
                </div>
              </div>
              : ''}


          </div>
        </SuperUniversalModal>



      </CSSTransition>
    </div >
  )
}

export default AdminPanel


/*

     <div className="">
                    {Array.isArray(searchOptionFront.dopSettings)
                      ?
                      <DopSettingsList id={classes.r3}>
                        {searchOptionFront.dopSettings.map((set, idx) => {
                          if (set.subcategorytype == 'string') {
                            //     setBuilderCategory({ ...builderCategory, inputString: [...builderCategory.inputString, set] })
                          }
                          return;
                          console.log(inputNumber)
                          console.log(inputString)
                          setBuilderCategory({ ...builderCategory, inputNumber: inputNumber })
                        })
                        }
                      </DopSettingsList>
                      : ''
                    }
                  </div>

*/
/*

 <InputFromDB
                    error={builderCategoryError.brand
                      ? builderCategoryError.brand
                      : ''}
                    cru={true}
                    cruObj={{ placeholder: 'Бренд', value: '', name: 'brand', ms: builderCategory.brand }}
                    //  idx={inputNumber?.id ? inputNumber.id : Date.now()}
                    builderCategory={builderCategory}
                    setBuilderCategory={setBuilderCategory} />
*/