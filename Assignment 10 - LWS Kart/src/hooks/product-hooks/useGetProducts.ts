import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetProducts = () => {
  const query = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/shop`
      )
      return data
    },
  })
  return query
}
export default useGetProducts
