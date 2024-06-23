import { useContext, useEffect, useState } from 'react'
import { FavoriteContext } from '../../context/index.js'
import useFavorite from './useFavorite.js'

const useReorderBlog = () => {
  const { isLoading, isError, isFetched } = useFavorite()
  const { favorites } = useContext(FavoriteContext)
  const [favoritesForReorder, setFavoriteForReorder] = useState([])
  const [parsedOrder, setParsedOrder] = useState([])

  const handleReorder = (reorderedIds) => {
    const reorderedFavs = reorderedIds.map((id) =>
      favoritesForReorder.find((favorite) => favorite.id === id)
    )
    setFavoriteForReorder(reorderedFavs)
    // setting the orders in local storage, no endpoint, no problem, I add this feature because its nice 🙂
    localStorage.setItem(
      'favoritesOrder',
      JSON.stringify(reorderedFavs.map((fav) => fav.id))
    )
  }

  useEffect(() => {
    if (favorites.length > 0) {
      setFavoriteForReorder(
        favorites.sort((a, b) => {
          // sorting the favorites in the order of ids
          if (parsedOrder.length === 0) {
            return 0
          }
          const indexA = parsedOrder.indexOf(a.id)
          const indexB = parsedOrder.indexOf(b.id)

          if (indexA === -1 || indexB === -1) {
            return 0
          }
          return indexA - indexB
        })
      )
    }
    // getting order of ids in local storage
    setParsedOrder(JSON.parse(localStorage.getItem('favoritesOrder')) || [])
  }, [favorites, isError, isLoading, isFetched])

  return { handleReorder, favoritesForReorder }
}
export default useReorderBlog
