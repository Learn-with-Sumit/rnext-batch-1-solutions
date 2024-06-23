import { useEffect } from 'react'
import { useCartContext } from '../context-hooks/useCartContext'
import { useWishlistContext } from '../context-hooks/useWishlistContext'

const useUseEffectMadness = (
  wishlists: IHeaderButtons['wishlists'],
  cartItems: IHeaderButtons['cartItems']
) => {
  const { setUserWishlist, userWishlist } = useWishlistContext()
  const { setUserCart, userCart } = useCartContext()
  useEffect(() => {
    // load the wishlist items to global state
    if (wishlists?.length! >= 0) {
      setUserWishlist({
        ...userWishlist,
        data: wishlists,
        error: false,
        loading: false,
      })
    }
  }, [wishlists, setUserWishlist])

  useEffect(() => {
    // load the cart items to global state
    if (cartItems?.length! >= 0) {
      setUserCart({
        ...userCart,
        data: cartItems,
        error: false,
        loading: false,
      })
    }
  }, [cartItems, setUserCart])

  // show different title when window is not focused
  useEffect(() => {
    let activeTitle = document.title
    let inactiveTitle = 'Come back for discount 😭'
    document.title = activeTitle
    window.addEventListener('blur', (e) => {
      document.title = inactiveTitle
    })
    window.addEventListener('focus', (e) => {
      // reset title
      document.title = activeTitle
    })
  }, [])
}
export default useUseEffectMadness
