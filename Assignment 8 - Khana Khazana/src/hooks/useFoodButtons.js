import { favoriteRecipe } from '@/actions.js'
import { useAuth } from '@/hooks/useAuth.js'
import { useFavorites } from '@/hooks/useFavorite.js'
import { useMenuAnimation } from '@/hooks/useMenuAnimation.js'
import { useRouter } from 'next/navigation.js'
import { useState } from 'react'
import { toast } from 'react-toastify'

const useFoodButtons = (recipeId) => {
  const [shareButtonsVisible, setShareButtonsVisible] = useState(false)
  // state for the share dropdown menu
  const [isOpen, setIsOpen] = useState(false)
  const [favLoading, setFavLoading] = useState(false)
  const { user } = useAuth()
  const { setFavorites, favorites } = useFavorites()

  const router = useRouter()
  const scope = useMenuAnimation(isOpen)
  //check if current recipe is users favorite
  const isFav = favorites?.includes(recipeId)

  const handleFavorite = async () => {
    if (!user?.email) {
      router.push('/login')
      return
    }
    setFavLoading(true)
    const updatedUser = await favoriteRecipe(recipeId, user?._id)
    setFavorites(updatedUser.favorites)
    setFavLoading(false)
    // show toast according to favorites list of a user
    if (!updatedUser.favorites.includes(recipeId)) {
      toast.info(`${updatedUser.recipeName} removed from favorites`, {
        autoClose: 1000,
      })
    } else {
      toast.success(`${updatedUser.recipeName} added to favorites`, {
        autoClose: 1000,
      })
    }
  }

  // this is for the share button click
  const handleClickShare = () => {
    setShareButtonsVisible(!shareButtonsVisible)
    setIsOpen(!isOpen)
  }
  return {
    favLoading,
    handleFavorite,
    isFav,
    handleClickShare,
    scope,
    setShareButtonsVisible,
    shareButtonsVisible,
    setIsOpen,
  }
}
export default useFoodButtons
