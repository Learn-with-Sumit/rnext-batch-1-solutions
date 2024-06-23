'use client'
import { WishlistContext } from '@/context'
import { ReactNode, useState } from 'react'

const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [userWishlist, setUserWishlist] = useState({
    loading: true,
    data: [],
    error: false,
    offlineWishlist: [],
  })

  return (
    <WishlistContext.Provider value={{ userWishlist, setUserWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}
export default WishlistProvider
