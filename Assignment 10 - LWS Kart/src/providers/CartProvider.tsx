'use client'
import { CartContext } from '@/context'
import { ReactNode, useState } from 'react'

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [userCart, setUserCart] = useState<ICartContextValue['userCart']>({
    loading: true,
    data: [],
    error: false,
    offlineCart: [],
    quantity: { productId: '', quantity: 0 },
  })

  return (
    <CartContext.Provider value={{ userCart, setUserCart }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider
