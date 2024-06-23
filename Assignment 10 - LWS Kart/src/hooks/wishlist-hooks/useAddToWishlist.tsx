'use client'
import ActionOfToast from '@/components/ui/toast-action'
import { useToast } from '@/components/ui/use-toast'
import { useWishlistContext } from '@/hooks/context-hooks/useWishlistContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const addToWishlist = async (userId: string, product: IProduct) => {
  try {
    const wishlist = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist`,
      {
        userId,
        product,
      }
    )
    return wishlist.data
  } catch (error) {
    throw error
  }
}

const useAddToWishlist = (product?: IProduct) => {
  const { toast } = useToast()
  const [clickedProduct, setClickedProduct] = useState('')
  const router = useRouter()
  const { setUserWishlist, userWishlist } = useWishlistContext()

  const productInWishList = userWishlist.data
    .map((product) => product._id)
    .includes(product?._id!)

  let productInOfflineWishlist = userWishlist.offlineWishlist
    .map((product) => product._id)
    .includes(product?._id!)

  const handleWishlist = async (userId: string, product: IProduct) => {
    setClickedProduct?.(product._id)
    if (!userId) {
      if (productInOfflineWishlist) {
        setUserWishlist({
          ...userWishlist,
          data: [],
          offlineWishlist: [...userWishlist.offlineWishlist].filter(
            (offlineProduct) => offlineProduct._id !== product._id
          ),
        })
      } else {
        setUserWishlist({
          ...userWishlist,
          data: [],
          offlineWishlist: [...userWishlist.offlineWishlist, product],
        })
      }
      router.push('/login')
    } else {
      setUserWishlist({ ...userWishlist, loading: true })
      const data = await addToWishlist(userId, product)

      if (productInWishList) {
        toast({
          description: `${product.product_name} removed from wishlist!`,
          variant: 'destructive',
          action: (
            <ActionOfToast
              link='/wishlist'
              alt='Go wishlist'
              text='Go to Wishlist'
            />
          ),
        })
      } else {
        toast({
          description: `${product.product_name} added to wishlist!`,
          action: (
            <ActionOfToast
              link='/wishlist'
              alt='Go cart'
              text='Go to Wishlist'
            />
          ),
        })
      }
      setUserWishlist({ ...userWishlist, data: data.wishlist, loading: false })
    }
    setClickedProduct?.('')
    // you said after clicking add to wishlist, take them to wishlist page, I think that is not a good UX, because every time a user clicks on add to wishlist, they wouldn't like to go to the wishlist page
    // router.push('/wishlist')
  }
  return { handleWishlist, userWishlist, clickedProduct }
}

export default useAddToWishlist
