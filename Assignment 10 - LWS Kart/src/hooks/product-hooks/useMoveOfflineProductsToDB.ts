import useAddToCart from '../cart-hooks/useAddToCart'
import { useCartContext } from '../context-hooks/useCartContext'
import { useWishlistContext } from '../context-hooks/useWishlistContext'
import useAddToWishlist from '../wishlist-hooks/useAddToWishlist'

const useMoveOfflineProductsToDB = () => {
  const { userWishlist, setUserWishlist } = useWishlistContext()
  const { userCart, setUserCart } = useCartContext()
  const { handleWishlist } = useAddToWishlist()
  const { handleAddToCart, toastId } = useAddToCart()

  const moveOfflineProductsToDB = async (
    loggedInUser: SessionWith_Id['user']
  ) => {
    // if user already added something to wishlist before logging in, after logging in, send them to wishlist collection in db, this is also true for cart
    if (userWishlist.offlineWishlist.length > 0) {
      const wishlistPromises = userWishlist.offlineWishlist.map(
        async (product: IProduct) => {
          await handleWishlist(loggedInUser?._id, product)
        }
      )
      await Promise.all(wishlistPromises)
      // empty the offline wishlist
      setUserWishlist((prevWishlist: IWishlistContextValue) => ({
        ...prevWishlist,
        offlineWishlist: [],
      }))
    }

    if (userCart.offlineCart.length > 0) {
      const cartPromises = userCart.offlineCart.map(
        async (product: IProductWithQuantity) => {
          await handleAddToCart(loggedInUser?._id, product)
        }
      )
      await Promise.all(cartPromises)
      // empty the offline cart
      setUserCart((prevCart: ICartContextValue) => ({
        ...prevCart,
        offlineCart: [],
      }))
    }
  }

  return moveOfflineProductsToDB
}
export default useMoveOfflineProductsToDB
