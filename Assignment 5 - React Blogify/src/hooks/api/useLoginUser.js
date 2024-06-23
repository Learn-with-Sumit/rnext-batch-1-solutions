import { useMutation } from '@tanstack/react-query'
import customFetch from '../../utils/customFetch.js'

const loginUser = async (user) => {
  try {
    return customFetch.post('auth/login', user)
  } catch (error) {
    return error
  }
}

const useLoginUser = () => {
  const mutation = useMutation({
    mutationFn: (user) => loginUser(user),
  })
  return mutation
}
export default useLoginUser
