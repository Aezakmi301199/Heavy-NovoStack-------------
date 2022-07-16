import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../App'
import MainPage from '../../pages/MainPage.jsx'
import Registration from '../../pages/Registration.jsx'
import { observer } from 'mobx-react-lite';
import Profile from '../../pages/Profile.jsx'
import ErrorPage from '../../pages/ErrorPage'
import ChatPage from '../../pages/ChatPage.jsx'
import Spinner from '../UI/spinner/Spinner.jsx'
import AdvertisementPage from '../../pages/AdvertismentPage'
import BigAdvertisment from '../../pages/BigAdvertisment'
import CreateAdvertismentPage from '../../pages/CreateAdvertismentPage'
import BasketPage from '../../pages/BasketPage'
import MyAdvertPage from '../../pages/MyAdvertPage'
import BigReport from '../../pages/BigReport'
import BrandPage from '../../pages/BrandPage'
import ForgetPasswordPage from '../../pages/ForgetPasswordPage'
import Protect from '../../pages/Protect'


const AppRouter = () => {
  const { store } = useContext(AuthContext);
  //  const params = useParams()
  return (
    store.isAuth ?
      <Routes>
        <Route path="/protect" element={<Protect />} />
        <Route path="/brands" element={<BrandPage />} />
        <Route path="/reports/:id" element={<BigReport />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/advertismentCreate" element={<CreateAdvertismentPage />} />
        <Route exact path="/advertisments" element={<AdvertisementPage />} />
        <Route exact path="/advertisments/:category" element={<AdvertisementPage />} />
        <Route exact path="/advertisment/:id" element={<BigAdvertisment />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/chat/:id" element={<ChatPage />} />
        <Route exact path="/chat" element={<ChatPage />} />
        <Route exact path="/myadvert" element={<MyAdvertPage />} />
        <Route exact path="/basket" element={<BasketPage />} />
        <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
      :
      <Routes>
        <Route path="/protect" element={<Protect />} />
        <Route path="/forgetPassword" element={<ForgetPasswordPage />} />
        <Route path="/brands" element={<BrandPage />} />
        <Route exact path="/advertisments" element={<AdvertisementPage />} />
        <Route exact path="/advertisments/:category" element={<AdvertisementPage />} />
        <Route exact path="/basket" element={<BasketPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route exact path="/advertisment/:id" element={<BigAdvertisment />} />
        <Route path="/advertismentCreate" element={<CreateAdvertismentPage />} />
        <Route exact path="/item/:id" element={<BigAdvertisment />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/errorPage" element={<ErrorPage />} />
        <Route exact path="/*" element={<ErrorPage />} />
      </Routes>
  )
}
export default observer(AppRouter)
