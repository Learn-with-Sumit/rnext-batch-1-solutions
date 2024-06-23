'use client'
import { FavoriteContext } from '@/context/index.js'
import { useState } from 'react'

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoriteContext.Provider>
  )
}
export default FavoriteProvider
