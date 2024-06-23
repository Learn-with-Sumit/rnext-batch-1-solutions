import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import customFetch from '../../utils/customFetch.js'
import useAuth from '../useAuth.js'

const useRefreshToken = () => {
  const { setAuth } = useAuth()

  const existingLoggedInUser = sessionStorage.getItem('userdet')
  const parsedUser = existingLoggedInUser
    ? JSON.parse(existingLoggedInUser)
    : null

  const renewToken = async () => {
    try {
      if (!parsedUser) return
      const response = await customFetch.post('auth/refresh-token', {
        refreshToken: parsedUser?.token?.refreshToken,
      })
      return response.data // response contains token data
    } catch (error) {
      toast.error("Couldn't refresh token!", { autoClose: 600 })
      throw error
    }
  }

  const mutation = useMutation({
    mutationFn: renewToken,
    onSuccess: (token) => {
      if (token) {
        setAuth({ ...parsedUser, token })
        sessionStorage.setItem(
          'userdet',
          JSON.stringify({ ...parsedUser, token })
        ) // set new token in the session storage
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong!')
    },
  })

  useEffect(() => {
    mutation.mutate()
  }, [])

  return mutation
}

export default useRefreshToken
