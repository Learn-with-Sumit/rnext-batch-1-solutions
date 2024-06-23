import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import useAxios from './useAxios.js'

const useLikeBlog = (id) => {
  const customFetch = useAxios()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (blogId) => {
      try {
        return customFetch.post(`blogs/${blogId}/like`)
      } catch (error) {
        return error
      }
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['single-blog', id] })
      if (data.data.isLiked) {
        toast.info('You like this blog!', { autoClose: 1000 })
      }
      if (!data.data.isLiked) {
        toast.info('You unlike this blog!', { autoClose: 1000 })
      }
    },
    onError: () => toast.error('Error liking the blog!', { autoClose: 1000 }),
  })
  return mutation
}
export default useLikeBlog
