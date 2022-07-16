import React, { useContext, useEffect, useState } from 'react'
import ProfileList from '../components/UI/Lists/ProfileList/ProfileList'
import classes from './imgPages/Profile.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../App'
import BigItem from '../components/UI/BigItem/BigItem'

const Profile = () => {
  const [advert, setAdvert] = useState([])
  const params = useParams()
  const [userID, setUserID] = useState('')
  console.log(userID)
  const { store } = useContext(AuthContext)
  const getAdvert = async () => {
    if (params.id == undefined) {
      await axios.get(`/advertismentsInProfile/${store.user.id}`).then(res => setAdvert(res.data))
    } else {
      await axios.get(`/advertismentsInProfile/${params.id}`).then(res => setAdvert(res.data))
    }
  }
  useEffect(() => {
    getAdvert()
  }, [params.id])

  return (
    <div className={classes.backProfile}>
      <ProfileList ParamID={params.id} />
      <div className={classes.items}>
        {advert.length > 0
          ? advert.map(advt => <BigItem key={advt.advt_id} paramID={advt.advt_id} advt={advt} />)
          : <h2 style={{ textAlign: 'center' }}>Объявлений нет</h2>
        }

      </div>
    </div>
  )
}

export default Profile