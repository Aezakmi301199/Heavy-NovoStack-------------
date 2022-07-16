import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../App'
import $api from '../../../../utils/AxiosInterceptors'
import { getNowTimeAndDate, makeNormalDate, makeNormalDateAndTime } from '../../../../utils/function'
import classes from './ProfileList.module.css'
import profile from '../../../../img/profile.png'
import vkPic from '../../../../img/vk.png'
import cancelChangeProfile from '../../../../img/close.png'
import youtubePic from '../../../../img/youtube.png'
import telegramPic from '../../../../img/telegram.png'
import confirmedPic from '../../../../img/activated.png'
import cancelPic from '../../../../img/cancel.png'
import '../../../../App.css'
import axios from 'axios'
import ProfileButton from '../../buttons/ProfileButton/ProfileButton'
import RegButton from '../../buttons/RegButton/RegButton'
import UniversalModal from '../../Modals/UniversalModal/UniversalModal'
import ExitButton from '../../buttons/ExitButton/ExitButton'
import { useNavigate } from 'react-router-dom'
import ErrorDiv from '../../errors/ErrorDiv/ErrorDiv'
import { changedUserPrST, errorValidatorST, userST } from '../../../../utils/useStateObjects'
import Spinner from '../../spinner/Spinner'
import RegButton2 from '../../buttons/RegButton2/RegButton2'
import SucessModal from '../../Modals/SucessModal/SucessModal'
import InputWithErrorCorrect from '../../Inputs/InputWithErrorCorrect/InputWithErrorCorrect'
import { observer } from 'mobx-react-lite'

const ProfileList = ({ ParamID }) => {
    console.log(ParamID)
    const navigate = useNavigate()
    const { store } = useContext(AuthContext)
    const [changedUserPr, setChangedUserPr] = useState(changedUserPrST)
    const [user, setUser] = useState(userST)
    const [updatePage, setUpdatePage] = useState('');
    const [errorValidator, setErrorValidator] = useState(errorValidatorST)
    const [loadingPage, setLoadingPage] = useState(true)
    const [sucessModalAuth, setSucessModalAUth] = useState(false)
    const getInfoABoutUser = async (ParamID) => {
        if (ParamID) {
            const info = await $api.get(`/profile/${ParamID}`)
            console.log(info.data)
            setTimeout(() => {
                let usersocialnetworkandpath = info.data.usersocialnetworkandpath;
                let login = info.data.login
                let time = makeNormalDate(info.data.userinfo.create_at)
                let userinfo = info.data.userinfo;
                setUser({ ...user, ...usersocialnetworkandpath, ...userinfo, login, datareg: time })
                setLoadingPage(false)
            }, 600)

        } else {
            const info = await $api.get(`/profile`)
            setTimeout(() => {
                let usersocialnetworkandpath = info.data.usersocialnetworkandpath;
                let login = info.data.login
                let time = makeNormalDate(info.data.userinfo.create_at)
                let userinfo = info.data.userinfo;
                setUser({ ...user, ...usersocialnetworkandpath, ...userinfo, login, datareg: time })
                setLoadingPage(false)
            }, 600)

        }
    }

    const sendPictureToBase = useCallback(async (picture) => {
        const data = new FormData();
        data.append("avatar", picture);
        console.log(data)
        axios.put('/profileAvatar', data, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => setUser({ ...user, avatar: res.data })).catch(e => console.log(e))
    }, [])

    useEffect(
        () => {
            if (ParamID === undefined) {
                console.log('Моя страница')
                getInfoABoutUser()
            } else if (ParamID != store.user.id) {
                console.log('Чужая')
                getInfoABoutUser(ParamID)
            }
        }, [ParamID, updatePage])


    const sendChangedInfo = (changedUser) => {
        console.log(changedUser)
        let user = {
            login: store.user.login,
            ...changedUser.email ? { email: changedUser.email } : {},
            ...changedUser.newPassword ? { newPassword: changedUser.newPassword } : {},
            ...changedUser.oldPassword ? { oldPassword: changedUser.oldPassword } : {},
            ...changedUser.country ? { country: changedUser.country } : {},
            ...changedUser.city ? { city: changedUser.city } : {},
            ...changedUser.first_name ? { first_name: changedUser.first_name } : {},
            ...changedUser.last_name ? { last_name: changedUser.last_name } : {},
            ...changedUser.age ? { age: changedUser.age } : {},
            ...changedUser.gender ? { gender: changedUser.gender } : {},
            ...changedUser.phone ? { phone: changedUser.phone } : {},
            ...changedUser.vk ? { vk: changedUser.vk } : {},
            ...changedUser.youtube ? { youtube: changedUser.youtube } : {},
            ...changedUser.telegram ? { telegram: changedUser.telegram } : {}
        }
        console.log(user)
        axios.put('/profile', { user }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(e => {
            console.log(e)
            setUpdatePage(e.data)
            setChangedUserPr(changedUserPrST)
            setErrorValidator(changedUserPrST)
            // onClick={e => { setChangedUserPr(changedUserPrST); setErrorValidator(changedUserPrST) }}
        }).catch(e => {
            console.log(e)
            console.log(e.response.data.erros)
            setErrorValidator({ ...errorValidatorST, ...e.response.data.erros })

        })
    }
    console.log(errorValidator)
    return (
        loadingPage
            ? <Spinner />
            :
            <div className={classes.profile}>
                <UniversalModal visible={changedUserPr.changedInfoProfile} id={classes.paddingTop40px}>
                    <button
                        onClick={e => { setChangedUserPr(changedUserPrST); setErrorValidator(changedUserPrST) }}
                        className={classes.cancel_changedProfile}><img className={classes.img13px} src={cancelChangeProfile} />
                    </button>
                    <ExitButton
                        id={classes.pos_saveChanges}
                        onClick={e => sendChangedInfo(changedUserPr)}
                        textContent={'Сохранить изменения'} />
                    <div className={classes.modalTop}>
                        <div className={classes.key}>
                            <input
                                readOnly
                                className={classes.inputUniversal}
                                placeholder='Email' disabled />
                            <input
                                readOnly
                                className={classes.inputUniversal}
                                placeholder='Старый пароль' disabled />
                            <input
                                readOnly
                                className={classes.inputUniversal}
                                placeholder='Новый пароль' disabled />
                            <input
                                readOnly
                                className={classes.inputUniversal}
                                placeholder='Телефон' disabled />
                            <input
                                readOnly
                                className={classes.inputUniversal}
                                placeholder='Имя' disabled />
                            <input
                                readOnly
                                className={classes.inputUniversal}
                                placeholder='Фамилия' disabled />
                            <input
                                readOnly
                                className={classes.inputUniversal}
                                placeholder='Возраст' disabled />
                            <input
                                className={classes.inputUniversal}
                                placeholder='Пол' disabled />
                        </div>
                        <div className={classes.boxValue}>
                            <InputWithErrorCorrect customClass={classes.marginTop15px} valueError={errorValidator.email}>
                                <input
                                    onChange={e => setChangedUserPr({ ...changedUserPr, email: e.target.value })}
                                    placeholder='Введите почту'
                                    value={changedUserPr.email}
                                    className={classes.inputUniversal} />
                            </InputWithErrorCorrect>

                            <InputWithErrorCorrect customClass={classes.marginTop15px} valueError={errorValidator.oldPassword}>
                                <input placeholder='Старый пароль'
                                    onChange={e => setChangedUserPr({ ...changedUserPr, oldPassword: e.target.value })}
                                    value={changedUserPr.oldPassword}
                                    className={classes.inputUniversal} />
                            </InputWithErrorCorrect>

                            <InputWithErrorCorrect customClass={classes.marginTop15px} valueError={errorValidator.newPassword}>
                                <input placeholder='Новый пароль'
                                    onChange={e => setChangedUserPr({ ...changedUserPr, newPassword: e.target.value })}
                                    value={changedUserPr.newPassword}
                                    className={classes.inputUniversal} />
                            </InputWithErrorCorrect>

                            <InputWithErrorCorrect customClass={classes.marginTop15px} valueError={errorValidator.phone}>
                                <input placeholder='Введите телефон'
                                    onChange={e => setChangedUserPr({ ...changedUserPr, phone: e.target.value })}
                                    value={changedUserPr.phone}
                                    className={classes.inputUniversal} />
                            </InputWithErrorCorrect>

                            <InputWithErrorCorrect customClass={classes.marginTop15px}>
                                <input placeholder='Введите имя'
                                    onChange={e => setChangedUserPr({ ...changedUserPr, first_name: e.target.value })}
                                    value={changedUserPr.first_name}
                                    className={classes.inputUniversal} />
                            </InputWithErrorCorrect>

                            <InputWithErrorCorrect customClass={classes.marginTop15px}>
                                <input placeholder='Введите фамилию'
                                    onChange={e => setChangedUserPr({ ...changedUserPr, last_name: e.target.value })}
                                    value={changedUserPr.last_name}
                                    className={classes.inputUniversal} />
                            </InputWithErrorCorrect>

                            <InputWithErrorCorrect customClass={classes.marginTop15px} valueError={errorValidator.age}>
                                <input placeholder='Введите возраст'
                                    onChange={e => setChangedUserPr({ ...changedUserPr, age: e.target.value })}
                                    value={changedUserPr.age}
                                    className={classes.inputUniversal} />
                            </InputWithErrorCorrect>

                            <InputWithErrorCorrect customClass={classes.marginTop15px}>
                                <select
                                    value={changedUserPr.gender}
                                    onChange={e => setChangedUserPr({ ...changedUserPr, gender: e.target.value })}
                                    form="gender" id="gender"
                                    className={classes.gender_select}>
                                    <option>Пол</option>
                                    <option value="Male">Мужчина</option>
                                    <option value="Female">Женщина</option>
                                </select>
                            </InputWithErrorCorrect>
                        </div>
                    </div>
                    <div className={classes.middle}>
                        <h5>Соц.сети</h5>
                        <div className={classes.modalTop}>
                            <div className={classes.key}>
                                <input readOnly
                                    className={classes.inputUniversal}
                                    placeholder='Vk' disabled />
                                <input readOnly
                                    className={classes.inputUniversal}
                                    placeholder='Youtube' disabled />
                                <input readOnly
                                    className={classes.inputUniversal}
                                    placeholder='Telegram' disabled />
                            </div>
                            <div className={classes.value}>
                                <input placeholder='Введите nickname vk'
                                    value={changedUserPr.vk}
                                    onChange={e => setChangedUserPr({ ...changedUserPr, vk: e.target.value })}
                                    className={classes.inputUniversal} />
                                <input placeholder='Введите назв.канала'
                                    onChange={e => setChangedUserPr({ ...changedUserPr, youtube: e.target.value })}
                                    value={changedUserPr.youtube}
                                    className={classes.inputUniversal} />
                                <input placeholder='Введите только никнэйм'
                                    onChange={e => setChangedUserPr({ ...changedUserPr, telegram: e.target.value })}
                                    value={changedUserPr.telegram}
                                    className={classes.inputUniversal} />
                            </div>
                        </div>
                    </div>
                    <div className={classes.middle}>
                        <h5>Местоположение</h5>
                        <div className={classes.modalTop}>
                            <div className={classes.key}>
                                <input readOnly
                                    className={classes.inputUniversal}
                                    placeholder='Страна' disabled />
                                <input readOnly
                                    className={classes.inputUniversal}
                                    placeholder='Город' disabled />
                            </div>
                            <div className={classes.value}>
                                <input placeholder='Введите страну'
                                    value={changedUserPr.country}
                                    onChange={e => setChangedUserPr({ ...changedUserPr, country: e.target.value })}
                                    className={classes.inputUniversal} />
                                <input placeholder='Старый город'
                                    value={changedUserPr.city}
                                    onChange={e => setChangedUserPr({ ...changedUserPr, city: e.target.value })}
                                    className={classes.inputUniversal} />
                            </div>
                        </div>
                    </div>
                </UniversalModal>
                <div className={classes.profile_left}>
                    <div className={classes.avatar}>
                        {user.avatar
                            ? <img src={user.avatar} className={classes.profileIcon} />
                            : <img src={profile} className={classes.profileIcon} />
                        }
                        {ParamID == undefined
                            ?
                            <input
                                type='file'
                                id='avatar'
                                name="avatar"
                                onChange={(e) => sendPictureToBase(e.target.files[0])}
                                className={classes.filePicture}
                            />
                            : ''
                        }
                    </div>
                    <h2>{user.login}</h2>
                    {(user.vk || user.youtube || user.telegram) != null ? <h3>Соц.сети</h3> : ''}
                    <ul className="iconRow">
                        {user.vk != null
                            ? <a href={`https://vk.com/${user.vk}`}><img src={vkPic} className={classes.icons} /></a>
                            : ''}
                        {user.youtube != null
                            ? <a href={`https://www.youtube.com/c/${user.youtube}`}><img src={youtubePic} className={classes.icons} /></a>
                            : ''}
                        {user.telegram != null
                            ? <a href={`https://t.me/${user.telegram}`}><img src={telegramPic} className={classes.icons} /></a>
                            : ''}
                    </ul>
                </div>
                <div className={classes.profile_right}>
                    <div className={classes.buttnsProfileList}>
                        {store.isAuth && ParamID != undefined
                            ? <ProfileButton onClick={e => navigate(`/chat/${ParamID}`)} textContent={'Написать сообщение'} />
                            : ''}
                        {ParamID === undefined ? <RegButton2
                            onClick={e => setChangedUserPr({ ...changedUserPr, changedInfoProfile: true })}
                            id={classes.changeProfileInfo} textContent={'Обновить данные'} /> : ''}
                    </div>
                    <div className={classes.profile_right_top}>
                        <div className={classes.geolocation}>
                            <h2>Местоположение</h2>
                            <label className={classes.cell}>
                                <h4>Страна</h4>
                                <input
                                    value={user.country ? user.country : 'Не указан'} disabled />
                            </label>
                            <label className={classes.cell}>
                                <h4>Город</h4>
                                <input
                                    value={user.city ? user.city : 'Не указан'} disabled />
                            </label>
                        </div>
                        <div className={classes.contact}>
                            <h2>Связь</h2>
                            <label className={classes.cell}>
                                <div className={classes.email}>
                                    <h4>Email</h4>
                                    {user.confirmed === false
                                        ? <img src={cancelPic} className={classes.fontSize13px13px} />
                                        : <img src={confirmedPic} className={classes.fontSize13px13px} />}
                                </div>
                                <input
                                    value={user.email} disabled />
                            </label>
                            <label className={classes.cell}>
                                <h4>Телефон</h4>
                                <input
                                    value={user.phone ? user.phone : 'Не указан'} disabled />
                            </label>
                        </div>
                    </div>
                    <div className={classes.profile_right_bottom}>

                        <label className={classes.cell}>
                            <h4>Имя</h4>
                            <input
                                className={classes.inputInfo}
                                value={user.first_name ? user.first_name : 'Имя не указано'} disabled />
                        </label>
                        <label className={classes.cell}>
                            <h4>Фамилия</h4>
                            <input
                                className={classes.inputInfo}
                                value={user.last_name ? user.last_name : 'Фамилия не указана'} disabled />
                        </label>
                    </div>
                </div>
                <SucessModal visible={sucessModalAuth} setVisible={setSucessModalAUth} textContent={'Необходимо авторизоваться'} />
            </div>

    )
}

export default ProfileList
                  /*
<label className={classes.cell}>
<h4>Дата Регистрации</h4>
<input
className={classes.inputInfo}
value={user.datareg} disabled />
</label>
*/