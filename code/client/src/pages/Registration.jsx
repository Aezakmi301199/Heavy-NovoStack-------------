import React from 'react'
import ModalReg from '../components/UI/Modals/ModalReg/ModalReg'
import classes from './imgPages/Registration.module.css'
import backreg from '../img/backreg.jpg'
const Registration = () => {

  return (
    <div className={classes.Registration}>
            <h2>Создавай аккаунт</h2>
            <ModalReg/>
    </div>
  )
}

export default Registration