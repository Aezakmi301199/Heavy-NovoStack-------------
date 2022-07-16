import React from 'react'
import { useParams } from "react-router-dom";
import BigItem from '../components/UI/BigItem/BigItem';
import classes from './imgPages/BigAdvertisment.module.css'
const BigAdvertisment = () => {
  const params = useParams()
  return (
    <div className={classes.BigAdvertisment}>
      <BigItem paramID={params.id} />
    </div>
  )
}

export default BigAdvertisment