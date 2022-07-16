import React from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import classes from './imgPages/BigReport.module.css'
import SuperUniversalModal from '../components/UI/Modals/SuperUniversalModal/SuperUniversalModal'
import { useState } from 'react'
import Spinner from '../components/UI/spinner/Spinner'
import $api from '../utils/AxiosInterceptors'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { AuthContext } from '../App'
import MoreButton from '../components/UI/buttons/MoreButton/MoreButton'
import RegButton from '../components/UI/buttons/RegButton/RegButton'
import RegButton2 from '../components/UI/buttons/RegButton2/RegButton2'
import InputFromDB from '../components/UI/Inputs/InputFromDB/InputFromDB'
import InputReg from '../components/UI/Inputs/InputReg/InputReg'
import InputSearch from '../components/UI/Inputs/InputSearch/InputSearch'
import InputWithErrorCorrect from '../components/UI/Inputs/InputWithErrorCorrect/InputWithErrorCorrect'
import InputFromDopSettings from '../components/UI/Inputs/InputFromDopSettings/InputFromDopSettings'

const BigReport = () => {
  const location = useLocation()
  const params = useParams()
  const navigate = useNavigate()
  const [report, setReport] = useState(location.state != null ? location.state : '')
  const [optionBack, setOptionBack] = useState({})
  const [optionFront, setOptionFront] = useState({})
  const [suspectUserError, setSuspectUserError] = useState({ status: '', reason: '', user_login: '' })
  const [suspectUser, setSuspectUser] = 
  useState({ status: '', statusName: '', reason: '', comment_admin: '', intruder_ID: location.state != null ? location.state.intruder_ID : '' })
  const [statusUser, setStatusUser] = useState([{ name: 'Одобрена', status: true }, { name: 'Отказана', status: false }])
  const [searchOptionFrontSAVED, setSearchOptionFrontSAVED] = useState({ status: ['Проверяется', 'Выполнена', 'Отклонена'], reason: [] })
  console.log(searchOptionFrontSAVED)
  console.log(location.state)
  // ! Пример входных данных
  // ? email: "vsemayki@gmail.com"
  // ? id: 1
  // ? intruder_ID: 12
  // ? intruder_login: "user"
  // ? message: "Реклама в объявлении у пользователя user Ссылка на аккаунт http://localhost:3000/profile/1"
  // ? reason: "clonAdvert"
  // ? reasonName: "Клонирование объявления"
  // ? status: "pending"
  // ? statusName: "Проверяется"
  // ? type: "appeal"
  // ? user_id: 2
  // ? comment_admin: Пошёл гулять отсюда пёс это нельзя читать или можно.Но лучше иди погуляй
  const errorCheck = (statusID) => {
    if (statusID == 404) {
      navigate('/errorPage')
    }
  }
  console.log(suspectUser)
  const getReportByID = async (id) => {
    //setReport(e.data)
    console.log('zdes')
    await $api.get(`/reports/${id}`).then(e => {
      setReport(e.data)
      setSuspectUser({...suspectUser,intruder_ID:e.data.intruder_ID})
    })
      .catch(e => errorCheck(e.response.status))

  }
  console.log(suspectUser)
  const reasonBlock = async () => {
    await $api.get('/allCriteriesreports').then(e => {
      setSearchOptionFrontSAVED({ ...searchOptionFrontSAVED, reason: e.data });
    })
  }

  const bearVerdict = async (reportID, suspect) => {
    setSuspectUserError({ status: '', reason: '', user_login: '' })
    console.log(reportID, suspect)
    await $api.put(`/bearVerdict/${reportID}`, suspect).then(e => navigate('/mainpage')).catch(e => setSuspectUserError(e.response.data.erros))
  }
  console.log(report)
  useEffect(() => {
    if (report == '') {
      getReportByID(params.id)
    }
    reasonBlock()
  }, [])
  console.log(searchOptionFrontSAVED)
  console.log(report)
  console.log(report.comment_admin == undefined)
  console.log(suspectUser)
  console.log(statusUser)
  console.log(searchOptionFrontSAVED)
  return (
    report != ''
      ?
      <div className="">
        <div className={[classes['backOrange']].join(' ')}>
          <h2>Жалоба №{report.id}</h2>
          <h3>Истец(ID) : {report.user_id}</h3>
          <h3>Обвиняемый : {report.intruder_login}</h3>
          <RegButton2 onClick={e => navigate(`/profile/${report.intruder_ID}`)} textContent={'Перейти на страницу подозреваемого'} />
          <h3>Обвинение : {report.reasonName}</h3>
          <h3>Комментарий предыдущего админа : {(report.comment_admin == '' || report.comment_admin == undefined) ? 'Отсутствует' : report.comment_admin}</h3>
          <h3>Статус жалобы : {report.status}</h3>
          <h3>Описание</h3>
          <h4>{report.message != '' ? report.message : 'Описание отсутствует'}</h4>
        </div>
        <div className={["flexRowJustifySpaceBetweenWrap", classes['adminPanel']].join(' ')}>
          <div className="left_side">
            <InputWithErrorCorrect id={classes.posInput} valueError={suspectUserError?.status}>
              <select className={classes.select} value={suspectUser.statusName} onChange={e => {
                if (e.target.value == '') {
                  setSuspectUser({ ...suspectUser, status: '', statusName: '' });
                } else {
                  setSuspectUser({ ...suspectUser, status: e.target.value == 'Одобрена' ? false : true, statusName: e.target.value });
                }
              }}>
                <option value={''}>Жалоба</option>
                {statusUser.map(status => <option
                  key={status.status}
                  value={status.name}
                  // onChange={e => setSuspectUser({ ...suspectUser, status: status.status, statusName: status.name })}
                  children={status.name} />)}
              </select>
              {suspectUser.status == true
                ? <InputFromDopSettings
                  value={suspectUser.comment_admin}
                  onChange={e => setSuspectUser({ ...suspectUser, comment_admin: e.target.value })}
                  id={classes.posInput} placeholder={'Причина отказа'} />
                : ''}
            </InputWithErrorCorrect>
          </div>

          {suspectUser.status === false
            ? <div className="left_side">
              <InputWithErrorCorrect valueError={suspectUserError?.reason}>
                <select className={classes.select} value={suspectUser.reason?.name} onChange={e => {
                  setSuspectUser({
                    ...suspectUser,
                    reason: searchOptionFrontSAVED.reason[searchOptionFrontSAVED.reason.findIndex(reasonObj => reasonObj.name == e.target.value)]
                  });

                }}>
                  <option defaultValue='' value="" >Причина блокировки</option>
                  {searchOptionFrontSAVED.reason.map(reason => <option key={reason.id} children={reason.name} />)}
                </select>
                {suspectUser.reason?.name == 'Другое'
                  ?
                  <InputFromDopSettings
                    value={suspectUser.comment_admin}
                    onChange={e => setSuspectUser({ ...suspectUser, comment_admin: e.target.value })}
                    id={classes.posInput} placeholder={'Причина блокировки'} />
                  : ''
                }
              </InputWithErrorCorrect>

            </div>
            : ''}

          <MoreButton id={classes.heigt4rem} textContent={'Вынести вердикт'}
           onClick={e => bearVerdict(report?.id, suspectUser)} />
        </div>
      </div>
      : <Spinner />

  )
}

export default observer(BigReport)
    // <Link to={`profile/${report.intruder_ID}`} >Перейти на страницу обвиняемого</Link>
        // <InputFromDB />