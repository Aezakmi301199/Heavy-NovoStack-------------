import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import MoreButton from '../buttons/MoreButton/MoreButton';
import classes from './Report.module.css'
const Report = ({ report, modalPanel, setModalPanel }) => {
   // ! Пример входных данных
   // ? email: "vsemayki@gmail.com"
   // ? id: 1
   // ? intruder_login: "user"
   // ? message: "Реклама в объявлении у пользователя user Ссылка на аккаунт http://localhost:3000/profile/1"
   // ? reason: "clonAdvert"
   // ? reasonName: "Клонирование объявления"
   // ? status: "pending"
   // ? statusName: "Проверяется"
   // ? type: "appeal"
   // ? user_id: 2

   const navigate = useNavigate()

   let { intruder_login, reasonName, status, id } = report;
   // { pathname: '/search', query: this.state.status  }
   console.log(report)
   console.log(id)
   return (
      <div className={[classes['width15rem'], 'marginTop5pxAll'].join(' ')}>
         <h5 className='textCenter'>Жалоба №{report.id} </h5>
         <p>Обвиняемый : {intruder_login}</p>
         <p>Обвинение : {reasonName}</p>
         <p>Статус жалобы : {status}</p>
         <Link to={`/reports/${id}`} state={report} onClick={e => setModalPanel(false)}>
            <MoreButton textContent={'Осмотреть дело'} />
         </Link>
      </div >
   )
}

export default Report





// className='container15rem marginTop5pxAll'

/**
 <MoreButton textContent={'Осмотреть дело'} onClick={e => {
    navigate("/mainpage", { replace: true });
    console.log('s') 
 */