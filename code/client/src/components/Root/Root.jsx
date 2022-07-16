import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Root.module.css'
const Root = () => {
  return (
    <div className={classes.root}>
      <div><Link to="/tech">Спецтехника</Link></div>
      <div><Link to="/protect">Правовые вопросы</Link></div>
      <div><Link to="/support">Техподдержка</Link></div>
      <div><Link to="/advertising">Реклама на сайте</Link></div>
    </div>
  )
}

export default Root