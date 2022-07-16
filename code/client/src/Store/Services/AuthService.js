import $api from "../../utils/AxiosInterceptors.js"


export default class AuthService {
    static async registration (login,password,email,phone,repeatPassword,age,user) {
     return await $api.post('/registration',{login,password,email,phone,repeatPassword,age,user})
    }
    static async login (login,password) {
        return await $api.post('/login',{login,password}) 
        // Возвращает  return { accesToken,refreshToken,user:{id:user.id,login,role:user.role}}
     }
     static async logout () { // Отправляем вроде refreshToken из куки
        return await $api.post('/logout')
     }
}