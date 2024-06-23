import { CartContext } from '@/context'
import { useContext } from 'react'

export const useCartContext = () => {
  const { userCart, setUserCart } = useContext(CartContext)

  return { userCart, setUserCart }
}
