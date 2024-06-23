import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useGetSingleProduct = (id: string) => {
  const query = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${id}`
      )
      return data
    },
  })
  return query
}
export default useGetSingleProduct
