import React, { useState, useContext, createContext, useEffect } from 'react'
import axios, { AxiosPromise } from 'axios'
import { ACCESS_TOKEN_KEY, USER_DATA_KEY } from '../constants'
import { endpoints } from '../services/api.service'

export type AuthContextType = {
  user: any,
  signinViaPhone: () => AxiosPromise;
  verifyOTP: () => AxiosPromise;
  signout: () => void;
  accessToken: string;
  isAuthenticated: boolean
  setIsAuthenticated: (auth: boolean) => void
  setUser: (user: any) => void
  signUp: (payload: any) => void
}

const AuthContext = createContext({
  user: null,
  signinViaPhone: () => { },
  verifyOTP: () => { },
  signout: () => { },
  accessToken: '',
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  setUser: () => { },
  setLoggedInUser: () => {}
})

const { REACT_APP_API_URL: BASE_URL } = process.env

export const AuthProvider: React.FC<{ children: React.ReactNode }> = (props: any): any => {
  const auth: any = useProvideAuth()

  return (
    <AuthContext.Provider value={auth}>
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): any => {
  return useContext(AuthContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(USER_DATA_KEY) || 'null')
    const token = localStorage.getItem(ACCESS_TOKEN_KEY) || 'null'

    if (user) setUser(user)

    if (token) {
      setAccessToken(token)
      setIsAuthenticated(true)
    }
  }, [])

  const signinViaPhone = (phoneNo: string, countryCode: string) => {
    const payload = {
      phoneNo,
      countryCode
    }
    return axios.post(BASE_URL + endpoints.login, payload)
  }

  const verifyOTP = (phoneNo: string, otp: number) => {
    const paylaod = {
      phoneNo,
      otp
    }
    return axios.post(BASE_URL + endpoints.verifyOTP, paylaod)
  }

  const signUp = (payload: { firstName: string, lastName: string, phoneNo: string }) => {
    return axios.post(BASE_URL + endpoints.signup, payload)
  }

  const signout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(USER_DATA_KEY)
    setUser(null)
    setIsAuthenticated(false)
    setAccessToken('')
  }

  const setLoggedInUser = (user: any, token: string) => {
    setUser(user)
    setIsAuthenticated(true)
    setAccessToken(token)
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user))
  }

  return {
    user,
    signinViaPhone,
    signout,
    verifyOTP,
    setUser,
    accessToken,
    setAccessToken,
    signUp,
    isAuthenticated,
    setIsAuthenticated,
    setLoggedInUser
  }
}

