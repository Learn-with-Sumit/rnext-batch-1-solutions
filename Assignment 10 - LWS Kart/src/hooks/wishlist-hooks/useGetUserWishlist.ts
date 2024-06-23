import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetUserWishlist = (userId: string, limit: number) => {
  const query = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${userId}?limit=${limit}`
      )
      return data
    },
    enabled: !!userId,
  })
  return query
}
export default useGetUserWishlist
