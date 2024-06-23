import { useMutation } from '@tanstack/react-query'
import useAxios from './useAxios.js'

const useClearAllFav = () => {
  const customFetch = useAxios()

  const mutation = useMutation({
    mutationFn: async (favorites) => {
      try {
        favorites.forEach((fav) =>
          customFetch.patch(`blogs/${fav.id}/favourite`)
        )
      } catch (error) {
        return error
      }
    },
  })
  return mutation
}
export default useClearAllFav
