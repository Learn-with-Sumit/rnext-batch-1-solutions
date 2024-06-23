import { useQuery } from '@tanstack/react-query'
import customFetch from '../../utils/customFetch.js'

const getSingleBlog = async (blogId) => {
  try {
    const data = customFetch.get(`blogs/${blogId}`)
    return data
  } catch (error) {
    return error
  }
}

const useGetSingleBlog = (blogId) => {
  const query = useQuery({
    queryKey: ['single-blog', blogId],
    queryFn: () => getSingleBlog(blogId),
  })

  return query
}
export default useGetSingleBlog
