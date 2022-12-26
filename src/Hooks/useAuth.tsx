import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'
import { ACCESS_TOKEN_KEY, USER_DATA_KEY } from '../constants'
import { endpoints } from '../services/api.service'

const AuthContext: any = createContext({
  user: null,
  signinViaPhone: () => { },
  verifyOTP: () => { },
  signout: () => { },
  accessToken: '',
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  setUser: () => { }
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
    console.log('========>', localStorage.getItem(ACCESS_TOKEN_KEY))
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

  const signout = () => {
    return null
  }

  return {
    user,
    signinViaPhone,
    signout,
    verifyOTP,
    setUser,
    accessToken,
    setAccessToken,
    isAuthenticated,
    setIsAuthenticated
  }
}

