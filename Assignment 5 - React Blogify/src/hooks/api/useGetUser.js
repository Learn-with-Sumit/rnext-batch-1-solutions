import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios.js'

const useGetUser = (id) => {
  const customFetch = useAxios()

  const query = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      try {
        return customFetch.get(`profile/${id}`)
      } catch (error) {
        return error
      }
    },
  })

  return query
}
export default useGetUser
