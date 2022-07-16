import React from 'react'
import classes from './SucessModal.module.css'
import close from '../../../../img/close.png'
const SucessModal = ({ visible, setVisible, textContent, children, ...props }) => {

  if (children) {
    return <div id={classes.pos} className={visible ? classes.modalAuth : classes.modalAuthOff}>
      {children}
      <button className={classes.closeButton}
        onClick={e => { e.preventDefault(); setVisible(false) }}
      ><img src={close} /></button>
    </div>
  }


  return (
    <div id={classes.pos} className={visible ? classes.modalAuth : classes.modalAuthOff}>
      <h5>{textContent}</h5>
      <button className={classes.closeButton}
        onClick={e => { e.preventDefault(); setVisible(false) }}
      ><img src={close} /></button>
    </div>
  )
}

export default SucessModal

