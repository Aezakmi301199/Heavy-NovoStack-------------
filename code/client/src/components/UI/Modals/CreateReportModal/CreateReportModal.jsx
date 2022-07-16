import { observer } from 'mobx-react-lite'
import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { AuthContext, store } from '../../../../App'
import close from '../../../../img/close.png'

import $api from '../../../../utils/AxiosInterceptors'
import MoreButton from '../../buttons/MoreButton/MoreButton'
import ErrorDiv from '../../errors/ErrorDiv/ErrorDiv'
import InputFromDopSettings from '../../Inputs/InputFromDopSettings/InputFromDopSettings'
import InputRegWithPicture from '../../Inputs/InputRegWithPicture/InputRegWithPicture'
import InputSearch from '../../Inputs/InputSearch/InputSearch'
import InputWithErrorCorrect from '../../Inputs/InputWithErrorCorrect/InputWithErrorCorrect'
import SuperUniversalModal from '../SuperUniversalModal/SuperUniversalModal'
import classes from './CreateReportModal.module.css'
const CreateReportModal = ({ intruder_login, setVisible, visible }) => {

 const { store } = useContext(AuthContext)
 const [reasonBlock, setReasonBlock] = useState([])
 const [suspectUserError, setSuspectUserError] = useState({ email: '', reason: '', message: '' })
 const [suspectUser, setSuspectUser] = useState({ email: '', reason: '', message: '', user_id: '' })
 console.log(suspectUserError)
 const fnreasonBlock = async () => {
  await $api.get('/allCriteriesreports').then(e => {
   setReasonBlock(e.data);
  })
 }
 const sendReport = async (objectReport) => {
  setSuspectUserError({ email: '', reason: '', message: '' })
  objectReport = store.isAuth ? { ...objectReport, user_id: store.user.id, } : objectReport
  console.log(store.isAuth)
  console.log(store.user.id)
  console.log(objectReport)
  await $api.post('/reports', objectReport).then(e => resetModal()).catch(e => setSuspectUserError(e.response.data.erros))
 }


 useEffect(() => {
  fnreasonBlock()
 }, [intruder_login])

 function resetModal () {
  setSuspectUserError({ email: '', reason: '', message: '' });
   setSuspectUser({ email: '', reason: '', message: '', user_id: '' });
    setVisible(!visible)
 }

 return (
  <div className={[classes['CreateReportModal'], visible == true ? 'on' : 'off'].join(' ')}>
   <InputWithErrorCorrect valueError={suspectUserError.reason}>
    <select className={classes.select} value={suspectUser.reason?.name} onChange={e => {
     setSuspectUser({
      ...suspectUser,
      reason: e.target.value
     });
    }}>
     <option defaultValue='' value="" >Причина блокировки</option>
     {reasonBlock.map(reason => <option key={reason.id} value={reason.reason} children={reason.name} />)}
    </select>
    {suspectUser.reason == 'other'
     ? <textarea id={classes.width100perc} placeholder={'Причина блокировки'}
      onChange={e => setSuspectUser({ ...suspectUser, message: e.target.value })}>
     </textarea>
     : ''
    }
   </InputWithErrorCorrect>
   <div className="flexRowJustifySpaceBetween">

    <InputWithErrorCorrect
     customClass={classes.inputWhite}
     value={suspectUser.email}
     valueError={suspectUserError.email}
     onChange={e => setSuspectUser({ ...suspectUser, email: e.target.value })}
     placeholder='Почта для получения ответа' />

    <MoreButton textContent='Отправить жалобу' onClick={e => sendReport({ intruder_login, ...suspectUser })} />
   </div>
   <div className={classes.absoluteLine}>
    <img
     onClick={e => resetModal()}
     src={close}
     className='img20px20px' />
   </div>
  </div>
 )
}

export default observer(CreateReportModal)

