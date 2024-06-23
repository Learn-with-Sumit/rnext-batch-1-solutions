import axios from 'axios'

export const fetchUserWishlist = async (userId: string) => {
  try {
    const { data: wishlist } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${userId}?limit=${Infinity}` // infinity so show all, a quick solution
    )
    return await wishlist
  } catch (error) {
    throw error
  }
}
export const fetchUserCart = async (userId: string) => {
  try {
    const cart = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${userId}`
    )
    return await cart.json()
  } catch (error) {
    throw error
  }
}
