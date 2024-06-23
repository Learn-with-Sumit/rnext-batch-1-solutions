import { useMutation } from '@tanstack/react-query'
import useAxios from './useAxios.js'

const useComment = () => {
  const customFetch = useAxios()
  const mutation = useMutation({
    mutationFn: async ({ blogId, content }) =>
      customFetch.post(`blogs/${blogId}/comment`, { content }),
  })

  const deleteMutation = useMutation({
    mutationFn: async ({ blogId, commentId }) =>
      customFetch.delete(`blogs/${blogId}/comment/${commentId}`),
  })

  return { mutation, deleteMutation }
}
export default useComment
