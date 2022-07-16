import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import backMainPic from '../img/backmain2.jpg'
import classes from './imgPages/MainPage.module.css'
import RegButton2 from '../components/UI/buttons/RegButton2/RegButton2'
import { Link, useNavigate } from 'react-router-dom'
import tap from '../img/tap.png'
import tractor from '../img/tractor.png'
import axios from 'axios'
const MainPage = () => {

    const [category, setCategory] = useState([])
    console.log(category)
    const getAllCategory = async () => {
        await axios.get('/category').then(res => { setCategory(res.data); console.log(res.data) }).catch(e => console.log(e))
    }
    useEffect(() => {
        getAllCategory()
    }, [])

    const navigate = useNavigate()
    return (
        <div className={classes.mainCol}>
            <div className={classes.banner}>
                <img src={backMainPic} className={classes.backMainPic} />
                <div className={classes.content}>
                    <h2>Любая техника для вас от именитых брендов</h2>
                    <RegButton2 id={classes.btnBanner} textContent={'Подробнее'}
                        onClick={e => navigate('/brands')} />
                </div>
            </div>

            <div className={classes.category}>
                {category.length > 0
                    ? category.map(cat => <div key={cat.id} className={classes.itemCatgory}>
                        <img src={cat.path_icon} className={classes.tech}
                            onClick={e => navigate(`/advertisments/${cat.category}`)} />
                        <h3>{cat.category}</h3>
                    </div>)
                    : ''}
            </div>
        </div>
    )
}

export default MainPage


