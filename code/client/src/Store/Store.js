
import {makeAutoObservable} from "mobx";
import axios from "axios";
import AuthService from "./Services/AuthService.js";
import { api_url } from "../config.js";
import $api from "../utils/AxiosInterceptors.js";
export default class Store{
    user = {};
    isAuth = false;
    isLoading = false;
    basketCount = 0;
    constructor() {
        makeAutoObservable(this);
     }    
     setAuth(respBool){
        this.isAuth = respBool;
    }
    setBasketCount(length){
        this.basketCount = length;
    }
     setUser (user){
        this.user = user;
    }
    setLoading (bool){
        this.isLoading = bool;
    }
     async login (login,password) {
        try {
            const responseFromBack = await AuthService.login(login,password);
            localStorage.setItem('accessToken',responseFromBack.data.tokens.accessToken);
            this.setAuth(true)
            this.setUser(responseFromBack.data.user)
            if (responseFromBack) { return true}
        } catch(e){
            if (e.response?.data?.erros){
                console.log(e);
                return {
                    errors:e.response.data.erros
                }
            }
        }
       }

       async getBasketCount () {
        try {
            const count = await $api.get('/basketCount')
            this.setBasketCount(count.data)
            return count.data
        } catch(e){
           console.log(e)
       }
       }

       async registration (user) {
        try {
        //    console.log(user)
            const responseFromBack = await AuthService.registration(    
                user.login,
                user.password,
                user.email,
                user.phone,
                user.repeatPassword,
                user.age,
                user )
           // localStorage.setItem('accessToken',responseFromBack.data.tokens.accessToken)
           // console.log(responseFromBack)
             //this.setAuth(true);
             //this.setUser(responseFromBack.user)
            if (responseFromBack) {
                return true
            }
          //  res.redirect('vk.com');
        } catch(e){ 
            if (e.response?.data?.erros) {
                console.log(e);
                return {
                    errors:e.response.data.erros
                }
            }
        }
       }

       async logout () { 
        try {
            const responseFromBack = await AuthService.logout()
            console.log('da')
           localStorage.removeItem('accessToken');
            this.setAuth(false);
            this.setUser({})
        } catch(e){
            console.log(e)
        }
       }
  
       async  checkAuth() {
           this.setLoading(true)
           try {   
                const responseFromBack =  await axios.get(`${api_url}/refresh`,{withCredentials:true})
                localStorage.setItem('accessToken',responseFromBack.data.tokens.accessToken)
                this.setAuth(true);
                this.setUser(responseFromBack.data.user)
           } catch(e){
               console.log(e.response?.data?.message)
           } finally {
            this.setLoading(false)
           }
       }
       
}