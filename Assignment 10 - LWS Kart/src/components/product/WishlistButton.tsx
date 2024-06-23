'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useAddToWishlist from '@/hooks/wishlist-hooks/useAddToWishlist'
import { WishlistButtonTranslations } from '@/utils/constants'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { FaHeart } from 'react-icons/fa'

const WishlistButton = ({
  userId,
  product,
  wishlistLocale,
}: IWishListButtonProp) => {
  const pathname = usePathname()
  const localeIsBangla = pathname.includes('/bn')

  const { handleWishlist, userWishlist } = useAddToWishlist(product)

  const productInWishList = userWishlist.data
    .map((product) => product._id)
    .includes(product._id)

  const t = localeIsBangla
    ? WishlistButtonTranslations.bn
    : WishlistButtonTranslations.en

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            onClick={() => handleWishlist(userId, product)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`border border-gray-300 ${
              productInWishList ? 'text-red-500' : 'text-gray-600'
            } px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-red-500 transition`}
          >
            <div className='flex gap-2 items-center'>
              {userWishlist.loading ? (
                <Loader2 className='animate-spin' />
              ) : (
                <>
                  <FaHeart /> <p>{wishlistLocale}</p>
                  <TooltipContent className='relative bottom-2'>
                    {userId && !productInWishList
                      ? t.addToWishlist
                      : userId && productInWishList
                      ? t.removeFromWishlist
                      : t.logInFirst}
                  </TooltipContent>
                </>
              )}
            </div>
          </motion.div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
export default WishlistButton
