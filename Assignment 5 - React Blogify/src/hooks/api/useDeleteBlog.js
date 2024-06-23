import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DELETE_BLOG } from '../../constants.js'
import useAuth from '../useAuth.js'
import useAxios from './useAxios.js'

const useDeleteBlog = (dispatch) => {
  const customFetch = useAxios()
  const queryClient = useQueryClient()
  const { auth } = useAuth()
  const mutate = useMutation({
    mutationFn: async (id) => await customFetch.delete(`blogs/${id}`),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', auth?.user?.id] })
      // Remove the deleted blog from the local list of blogs
      dispatch({ type: DELETE_BLOG, payload: variables }) // variables contain the id
      toast.success(data.data.message, { autoClose: 1000 })
    },
  })
  return mutate
}
export default useDeleteBlog
