import React, { useContext } from 'react';
import classes from './Item.module.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MoreButton from '../buttons/MoreButton/MoreButton';
import { Link, useNavigate } from 'react-router-dom'
import { ms } from '../../../pages/imgPages/ms';
import { AuthContext } from '../../../App';
import $api from '../../../utils/AxiosInterceptors';
import UniversalModal from '../Modals/UniversalModal/UniversalModal';
import { useState } from 'react';
import BigItem from '../BigItem/BigItem';
import { makeNormalDateAndTime } from '../../../utils/function';
import { useEffect } from 'react';

const Item = ({ myadvert, setChangeModal, changeModal, removeCheck, advt }) => {
  const [deleteState, setDeleteState] = useState(false)
  const { store } = useContext(AuthContext)
  const navigate = useNavigate()
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const deleteAdvert = async (advt_id) => {
    await $api.delete(`/advertisments/${advt_id}`).then(res => setDeleteState(true))
  }
  // user_id, user_login, title, exposition, cost, location, create_at, advt_id, pictures, dopSettings, category, mileage
  console.log('VASYA')
  let [advtert, setAdvert] = useState(advt)






  return (
    <div className={deleteState == false ? classes.item : 'off'}>
      <div className={classes.itemTop}>
        <h4 onClick={e => {
          if (advtert.user_id == store?.user?.id) {
            navigate(`/profile`)
          } else { navigate(`/profile/${advtert.user_id}`) }
        }}>{advtert.user_login}</h4>
        <h6>{makeNormalDateAndTime(advt.create_at)}</h6>
      </div>
      <Slider className={classes.slider} {...settings}>
        {advtert?.pictures.map(item => {
          return <div key={item.id} className={classes.picture}>
            <img src={item.path} />
          </div>
        })}
      </Slider>
      <div className={classes.itemPreTop}>
        <h5>{advtert.title}</h5>
        <h5>Стоимость {advtert.cost ? advtert.cost : 'не указана'}</h5>
      </div>
      <div className={classes.tech}>
        <div className="left_side">
          <h5>Категория</h5>
          <h5>Пробег</h5>
          {advtert.dopSettings
            ? advtert.dopSettings.map(set => <h5 key={set.subcategory}>
              {set.subcategory}
            </h5>)
            : []}
        </div>
        <div className="right_side">
          <h5>{advtert.category}</h5>
          <h5>{advtert.mileage == null ? 'Не указан' : advtert.mileage}</h5>
          {advtert.dopSettings
            ? advtert.dopSettings.map(set => <h5 key={set.subcategory}>
              {set.value} {set.unit ? set.unit : ''}
            </h5>)
            : []}
        </div>
      </div>
      <div className={classes.itemBottom}>
        <div className={classes.location}>
          <h5>Расположение</h5>
          <p>{advtert.location ? advtert.location : 'не указано'}</p>
        </div>
        {myadvert
          ? <div className="left_side">
            <MoreButton
              id={classes.colorOrange}
              onClick={e => setChangeModal({
                ...changeModal, changeModal: true,
                children: <BigItem
                  fromItemAdvt={advtert}
                  setfromItemAdvt={setAdvert}
                  changeModal={changeModal}
                  setChangedModal={setChangeModal}
                  myadvert={true}
                  paramID={advt.advt_id}
                />
              })}
              textContent={'Изменить'} />
            <MoreButton
              id={classes.colorRed}
              onClick={e => deleteAdvert(advt.advt_id)}
              textContent={'Удалить'} />
          </div>
          : <MoreButton
            onClick={e => navigate(`/advertisment/${advt.advt_id}`)}
            textContent={'Подробности'} />}
      </div>
    </div>
  )
}

export default Item

/* // * Описание может пригодиться
<div className={classes.itemMiddle}>
         <h4>{exposition == 'off' ? '' : 'Описание'}</h4>
         <p>{exposition == 'off' ? ''  : exposition ? exposition :'Отсутствует'}</p>
    </div>
 */