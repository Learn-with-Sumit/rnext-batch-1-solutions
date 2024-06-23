import { useState } from 'react'
import { FavoriteContext } from '../context/index.js'

const FavoriteProvider = ({ children }) => {
  // local storage implemented so the user can add to favorites even if they are offline
  const localFavorites = JSON.parse(localStorage.getItem('favoriteBlogs')) || []

  const [favorites, setFavorites] = useState(localFavorites) // inititally local storage favorites are set

  return (
    <FavoriteContext.Provider
      value={{ favorites, setFavorites, localFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}

export default FavoriteProvider
