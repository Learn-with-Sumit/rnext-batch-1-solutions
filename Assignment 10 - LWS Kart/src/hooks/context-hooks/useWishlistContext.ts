import { WishlistContext } from '@/context'
import { useContext } from 'react'

export const useWishlistContext = () => {
  const { userWishlist, setUserWishlist } = useContext(WishlistContext)

  return { userWishlist, setUserWishlist }
}
