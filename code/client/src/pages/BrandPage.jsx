import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import classes from './imgPages/BrandPage.module.css'
const BrandPage = () => {

  const [categoryAndBrand, setCategoryAndBrand] = useState([])
  console.log(categoryAndBrand)
  const getAllCategoryAndBrand = async () => {
    axios.get('/categoryAndBrand').then(e => setCategoryAndBrand(e.data))
  }

  useEffect(() => { getAllCategoryAndBrand() }, [])

  return (
    <div className={['flexColumnAlignCenter', classes['bottom30px']].join(' ')}>
      <h1 className='textCenter'>Список компаний представленных на данном сайте</h1>
      {categoryAndBrand.length > 0
        ? categoryAndBrand.map(cat => <div key={cat.category} className="marginTop10pxAll flexColumnAlignCenter">
          <div className="width25rem flexColumnAlignJustifyCenter">
            <img className='width95perheight75per' src={cat.path_icon} />
          </div>
          <h2 className='texte'>{cat.category}</h2>
          <div className={['contFlexWrap', classes['brands']].join(' ')}>
            {cat.brand.length > 0
              ? cat.brand.map(brand => <div key={brand.id} className={classes.brand}>
                <h5 className='colorOrangered'>{brand.brand}</h5>
              </div>)
              : <h5>Представителей данной категории нет</h5>}
          </div>

        </div>)
        : ''}
    </div>
  )
}

export default BrandPage