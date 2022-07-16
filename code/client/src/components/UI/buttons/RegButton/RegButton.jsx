import React from 'react'
import classes from './RegButton.module.css'
const RegButton = ({onClick,textContent,colorSucces,id,...args}) => {

  return (  
    <div {...args}   className={classes.body_button}>
      <button
        id={id}
        className={classes.button_hola}
        onClick={onClick}>     
         {textContent}
      </button>
    </div>
  )
}

export default RegButton

/*
  .btn:hover, .btn:focus {
        background-color:rgb(76, 0, 255) ;
        color: #fff;
        outline: 0;
      }
      .fourth {
        border: none;
        background-position: 100%;
        background-size: 400%;
        -webkit-transition: background 100ms ease-in-out;
        transition: background 100ms ease-in-out;
      }
      */