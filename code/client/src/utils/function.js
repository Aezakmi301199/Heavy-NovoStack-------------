import {
  useCallback,
  useRef
} from "react";
import $api from "./AxiosInterceptors.js";

// ***********************************************
// ! ВРЕМЯ,ДАТА,ДЕНЬГИ 
export const getNowTimeAndDate = () => {
  let ifYourDayWasALastDay = new Date();
  ifYourDayWasALastDay.setHours(0, 0, 0, 0);
  return ifYourDayWasALastDay
}
export const makeNormalDateAndTime = (data) => {
  const rez = data.split('T')
  const date = rez[0]
  const time = rez[1].split('.')[0]
  return `${date} ${time}`
}
export const makeNormalDate = (date) => {
  date = Date.parse(date);
  return date = new Date(date).toLocaleDateString();
}
export const convertMoneyTo1000 = (num) => {
  return num.toLocaleString().replaceAll(`,`, ' ')
}
// ***********************************************


// ***********************************************
// ! Создание искуств.задержки
export const useInputLag = (cb, delay) => {
  const timer = useRef()
  const lag = useCallback((...args) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      cb(...args)
    }, delay)
  }, [cb, delay])
  return lag;
}
// ***********************************************

// ***********************************************
// ! Корзина

export const basketCount = async (setBasketCountlength) => {
  await $api.get('/basketCount').then(res => setBasketCountlength(res.data))
}

export const sendToBasket = async (id) => {
  await $api.post('/basket', {
    id
  })
  // await axios.post('/basket',{id},{headers:{'Authorization':`Bearer ${localStorage.getItem('accessToken')}`}})
}
export const removeToBasket = async (id) => {
  await $api.delete('/basket', {
    params: {
      id
    }
  })
  // await axios.delete('/basket',{id},{headers:{'Authorization':`Bearer ${localStorage.getItem('accessToken')}`}})
}

// ***********************************************

export function unique(a) {
  console.log(a)
  var isAdded,
    arr = [];
  for (var i = 0; i < a.length; i++) {
    isAdded = arr.some(function (v) {
      return isEqual(v, a[i]);
    });
    if (!isAdded) {
      arr.push(a[i]);
    }
  }
  return arr;
}

function isEqual(a, b) {
  var prop;
  for (prop in a) {
    if (a[prop] !== b[prop]) return false;
  }
  for (prop in b) {
    if (b[prop] !== a[prop]) return false;
  }
  return true;
}
//         let inputNumber = removeItemFromArray(fromToSliderRez, 'subcategory', builderCategory.inputNumber);
 export const removeItemFromArray = (item, property, array) => {
  let indexItem = array.findIndex(arrItem => arrItem[property] == item[property])
  console.log(indexItem)
  if (indexItem != -1) {
    const filteredItem = array.filter(arrItem => arrItem[property] != item[property])
    return filteredItem
  } else { return array }
}