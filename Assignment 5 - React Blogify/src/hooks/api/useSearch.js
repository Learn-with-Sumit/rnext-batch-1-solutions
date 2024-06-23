import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios.js'

const useSearch = (q) => {
  const customFetch = useAxios()
  const query = useQuery({
    queryKey: ['search', q],
    queryFn: async () => {
      try {
        return customFetch.get(`search?q=${q}`)
      } catch (error) {
        return error
      }
    },
    enabled: !!q,
    retry: 0,
  })
  return query
}
export default useSearch
