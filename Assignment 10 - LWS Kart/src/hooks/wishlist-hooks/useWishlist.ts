import useGetUserWishlist from '@/hooks/wishlist-hooks/useGetUserWishlist'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const useWishlist = (userId: string) => {
  const { lang } = useParams()
  const queryClient = useQueryClient()
  const [limit, setLimit] = useState(10)
  const infiniteScrollRef = useRef(null)
  const [hasMore, setHasMore] = useState(true)

  const {
    data: wishlist,
    isError,
    isLoading,
  } = useGetUserWishlist(userId, limit)

  // get total count of wishlists
  const { data: totalWishlists } = useQuery({
    queryKey: ['wishlistLength', userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/count/${userId}`
      )
      return data
    },
  })

  useEffect(() => {
    // set has more to true or false
    if (totalWishlists && wishlist?.length === totalWishlists) {
      setHasMore(false)
    }
    if (totalWishlists && wishlist?.length < totalWishlists) {
      setHasMore(true)
    }

    // set limit on intersection
    const onIntersection = (items: any) =>
      items[0].isIntersecting &&
      hasMore &&
      setLimit((prevLimit) => prevLimit + 10)

    const observer = new IntersectionObserver(onIntersection)
    observer &&
      infiniteScrollRef.current &&
      observer.observe(infiniteScrollRef.current)

    return () => observer && observer.disconnect()
  }, [hasMore, wishlist?.length, userId, queryClient, totalWishlists])

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['wishlist', userId] })
  }, [queryClient, limit, userId])

  return {
    isLoading,
    isError,
    wishlist,
    totalWishlists,
    infiniteScrollRef,
    hasMore,
    lang,
  }
}
export default useWishlist
