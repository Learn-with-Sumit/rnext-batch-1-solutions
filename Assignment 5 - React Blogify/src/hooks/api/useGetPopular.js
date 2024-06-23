import { useQuery } from '@tanstack/react-query'
import customFetch from '../../utils/customFetch.js'

const getPopular = async () => {
  try {
    const data = customFetch.get('blogs/popular')
    return data
  } catch (error) {
    return error
  }
}

const useGetPopular = () => {
  const query = useQuery({
    queryKey: ['popular-blogs'],
    queryFn: getPopular,
  })

  return query
}
export default useGetPopular
