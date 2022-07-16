import React, { useEffect } from 'react'
import { BrowserRouter} from 'react-router-dom'
import './App.css'
import AppRouter from './components/AppRouter/AppRouter.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Store from './Store/Store.js'
import { observer } from 'mobx-react-lite';
import Root from './components/Root/Root.jsx'

export const store = new Store();
export const AuthContext = React.createContext({
  store
})
const App = () => {
  useEffect(  () => {
    if (localStorage.getItem('accessToken')){
      store.checkAuth()
    }},[])
  return (
    <AuthContext.Provider value={{store}}>
      <BrowserRouter>
      <Navbar/>
      <AppRouter/>
      <Root/>
      </BrowserRouter>
   
    </AuthContext.Provider>
  )
}

export default observer(App)