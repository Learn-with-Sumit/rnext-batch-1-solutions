import { useQueries } from '@tanstack/react-query'
import customFetch from '../../utils/customFetch.js'

const useGetLikedUsers = (likes) => {
  // using the likes array ids to fetch the users to populate the tooltip to show which users liked the blog
  const results = useQueries({
    queries: likes.map((data) => ({
      queryKey: ['like', data.id],
      queryFn: async () => await customFetch.get(`profile/${data.id}`),
    })),
    // return the combined results of each query
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  })
  return results
}
export default useGetLikedUsers
