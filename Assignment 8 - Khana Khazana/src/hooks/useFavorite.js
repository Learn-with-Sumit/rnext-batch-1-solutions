import { FavoriteContext } from '@/context/index.js'
import { useContext } from 'react'

export const useFavorites = () => {
  const { favorites, setFavorites } = useContext(FavoriteContext) ?? {}

  return { favorites, setFavorites }
}
