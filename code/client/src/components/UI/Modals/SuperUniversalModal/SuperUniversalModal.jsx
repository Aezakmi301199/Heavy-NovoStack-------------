import React from 'react'
import classes from './SuperUniversalModal.module.css'
import close from '../../../../img/close.png'
import BigAdvertButton from '../../buttons/BigAdverButton/BigAdvertButton'
import MoreButton from '../../buttons/MoreButton/MoreButton'
const SuperUniversalModal = ({ crud, textContent, visible, setVisible, children, id, onClickFirstButton, onClickCancel, ...props }) => {


  return (
    <div id={id} {...props} className={visible ? classes.modalOn : classes.modalOff}>
      {children}
      {crud
        ? <div className={classes.absoluteLine}>
          <MoreButton textContent={textContent}
            onClick={onClickFirstButton} />
          <img
            onClick={e => onClickCancel ? onClickCancel() : setVisible(!visible)}
            src={close}
            className='img20px20px' />
        </div>
        : <img
          onClick={e => setVisible(!visible)}
          src={close}
          className='img20px20px cancelAbsoluteTopRight' />}
    </div>
  )
}

export default SuperUniversalModal


