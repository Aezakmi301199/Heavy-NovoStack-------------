import axios from "axios";
import { api_url } from "../config.js";

const $api = axios.create({
    withCredentials:true,
    baseURL:api_url,
})
$api.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${api_url}/refresh`, {withCredentials: true})
            console.log(response)
            localStorage.setItem('accessToken', response.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
    console.log(error)
    throw error;
})


export default $api;