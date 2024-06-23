import { useMutation } from '@tanstack/react-query'
import customFetch from '../../utils/customFetch.js'

const registerUser = async (newUserDetails) => {
  try {
    return customFetch.post('auth/register', newUserDetails)
  } catch (error) {
    return error
  }
}

const useRegisterUser = () => {
  const mutation = useMutation({
    mutationFn: (newUserDetails) => registerUser(newUserDetails),
  })
  return mutation
}
export default useRegisterUser
