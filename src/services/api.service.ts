import axios, { AxiosInstance } from "axios";
import { ACCESS_TOKEN_KEY } from "../constants";

const { REACT_APP_API_URL } = process.env


console.log('REACT_APP', REACT_APP_API_URL)

const axiosInstance: AxiosInstance = axios.create({
    baseURL: REACT_APP_API_URL,
})

export const endpoints = {
    login: '/auth/login',
    signup: '/auth/register',
    verifyOTP: '/auth/verifyOTP'
}


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY) || null
    config.headers = {
        ...config.headers,
        'Authorization': `Beraer ${token}`
    }
    return config
}, (err) => {
    console.log('Error in axios interceptor:', err)
})

export default axiosInstance