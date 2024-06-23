import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useStock = (product: IProduct) => {
  const query = useQuery({
    queryKey: ['stock', product._id],
    queryFn: async () =>
      await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/${product._id}`
      ),
    refetchInterval: 5000,
    enabled: !!product._id,
  })
  return query
}
export default useStock
