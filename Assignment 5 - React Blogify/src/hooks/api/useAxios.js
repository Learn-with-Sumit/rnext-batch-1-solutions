import axios from 'axios'
import { useEffect } from 'react'
import customFetch from '../../utils/customFetch.js'
import useAuth from '../useAuth.js'

const UNAUTHORIZED = 401

const useAxios = () => {
  const { auth, setAuth } = useAuth()
  useEffect(() => {
    const reqIntercept = customFetch.interceptors.request.use(
      (config) => {
        const token = auth?.token?.accessToken
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const resIntercept = customFetch.interceptors.response.use(
      (response) => response,
      async (error) => {
        const ogRequest = error.config

        if (error.response.status === UNAUTHORIZED && !ogRequest._retry) {
          ogRequest._retry = true

          try {
            const refreshToken = auth?.token?.refreshToken
            const res = await customFetch.post('auth/refresh-token', {
              refreshToken,
            })
            const { token } = res.data

            setAuth({ ...auth, token: { ...auth.token, accessToken: token } })

            ogRequest.headers.Authorization = `Bearer ${token}`
            return axios(ogRequest)
          } catch (error) {
            return error
          }
        }
        return Promise.reject(error)
      }
    )
    return () => {
      customFetch.interceptors.request.eject(reqIntercept)
      customFetch.interceptors.response.eject(resIntercept)
    }
  }, [auth, setAuth])
  return customFetch
}
export default useAxios
