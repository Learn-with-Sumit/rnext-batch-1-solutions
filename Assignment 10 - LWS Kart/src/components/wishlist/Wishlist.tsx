'use client'

import WishlistSkeleton from '@/app/[lang]/(user)/wishlist/loading'
import useWishlist from '@/hooks/wishlist-hooks/useWishlist'
import { Loader2 } from 'lucide-react'
import Bubbly from '../ui/bubble-text'
import NoWishlist from './NoWishlist'
import WishlistItem from './WishlistItem'
import WishlistWrapper from './WishlistWrapper'

const Wishlist = ({ userId }: { userId: string }) => {
  const {
    isLoading,
    isError,
    wishlist,
    totalWishlists,
    infiniteScrollRef,
    hasMore,
    lang,
  } = useWishlist(userId)

  let content = null

  if (isLoading && !isError) {
    content = (
      <WishlistWrapper>
        <WishlistSkeleton />
      </WishlistWrapper>
    )
  }

  if (!isLoading && isError) {
    content = (
      <p className='italic text-red-500'>
        {lang === 'bn' ? 'স্টক ত্রুটি' : 'Stock Error'}
      </p>
    )
  }

  if (!isLoading && !isError && wishlist.length === 0) {
    content = <NoWishlist lang={lang as ILang['lang']} />
  }

  if (!isLoading && !isError && wishlist.length > 0) {
    content = (
      <WishlistWrapper>
        {wishlist.map((wProduct: IProduct) => {
          return (
            <WishlistItem
              lang={lang as ILang['lang']}
              product={wProduct}
              userId={userId}
              key={wProduct._id}
            />
          )
        })}
        {hasMore && totalWishlists > 10 && (
          <div ref={infiniteScrollRef} className='h-10'>
            <Loader2 className='animate-spin m-auto' />
          </div>
        )}
      </WishlistWrapper>
    )
  }

  return (
    <main className='flex flex-col gap-2 w-full'>
      {isLoading && !isError && !totalWishlists ? (
        <Loader2 className='animate-spin m-auto' />
      ) : (
        <Bubbly
          text={
            totalWishlists <= 1
              ? `${totalWishlists ?? 0} Wishlist`
              : `${totalWishlists ?? 0} Wishlists`
          }
        />
      )}
      {content}
    </main>
  )
}
export default Wishlist
