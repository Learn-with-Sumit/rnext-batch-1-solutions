import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { uploadImage } from '../../utils/uploadImage.js'
import useAuth from '../useAuth.js'
import useAxios from './useAxios.js'

const useUpdateProfile = (profile, profileId) => {
  const customFetch = useAxios()
  const queryClient = useQueryClient()
  const { setAuth, auth } = useAuth()

  const { firstName, lastName, bio, avatar } = profile || {}
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm({
    values: {
      firstName,
      lastName,
      bio,
      avatar,
    },
    resetOptions: {
      keepDirtyValues: false, // if the user changes the input value, and then reset occurs, the dirty values will not be there
    },
  })
  const existingLoggedInUser = sessionStorage.getItem('userdet')
  const [currentlyEditing, setCurrentlyEditing] = useState(null)
  const fileInputRef = useRef(null)

  // check if user is myself
  const isLoggedInAndUserIsMe =
    auth?.token?.accessToken && auth?.user?.id === profileId
  const parsedUser = existingLoggedInUser
    ? JSON.parse(existingLoggedInUser)
    : null

  const mutation = useMutation({
    mutationFn: async (data) => customFetch.patch('profile', data),
    onSuccess: ({
      data: {
        user: { id, avatar, bio, firstName, lastName },
      },
    }) => {
      setAuth({
        ...auth,
        user: { ...auth.user, avatar, firstName, lastName, bio },
      })
      // luckily session storage can rescue us because profile picture only updates in one endpoint but we need it in different places :)
      sessionStorage.setItem(
        'userdet',
        JSON.stringify({
          ...parsedUser,
          user: { ...parsedUser.user, avatar, firstName, lastName, bio },
        })
      )
      queryClient.invalidateQueries({ queryKey: ['user', id] })
    },
  })

  const onSubmit = (values) => {
    // arbitrary values so mutate for amount of entries in the values
    Object.entries(values).forEach(([key, value]) =>
      mutation.mutate(
        { [key]: value },
        {
          onSuccess: () => {
            toast.success('Profile Updated', { autoClose: 1000 })
            reset()
            setCurrentlyEditing(null)
          },
          onError: () => {
            toast.error('Unable to update', { autoClose: 1000 })
          },
        }
      )
    )
  }

  const handleOpenFileUpload = () => {
    fileInputRef.current.click()
    // if the photo input changes, upload it immediately
    fileInputRef.current.addEventListener('change', () =>
      uploadImage(fileInputRef, toast, mutation)
    )
  }

  return {
    onSubmit,
    handleOpenFileUpload,
    currentlyEditing,
    setCurrentlyEditing,
    errors,
    handleSubmit,
    register,
    isLoggedInAndUserIsMe,
    fileInputRef,
    reset,
    watch,
  }
}
export default useUpdateProfile
