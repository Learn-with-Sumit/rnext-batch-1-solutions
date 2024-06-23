'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import useAddToWishlist from '@/hooks/wishlist-hooks/useAddToWishlist'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { FaHeart } from 'react-icons/fa'

const ProductWishlistButton = ({
  product,
  session,
}: {
  product: IProduct
  session: SessionWith_Id
}) => {
  // for google and facebook, shape of the session object is different than credential log ins
  const userId = session?.user?._id?.toString() ?? session?.user?.id
  const { handleWishlist, userWishlist, clickedProduct } =
    useAddToWishlist(product)

  const productInWishList = userWishlist.data
    .map((product) => product._id)
    .includes(product._id)

  const { lang } = useParams()

  const isLocaleBengali = lang === 'bn'

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            onClick={() => handleWishlist(userId, product)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`text-white text-lg w-9 h-8 rounded-full flex items-center justify-center ${
              productInWishList ? 'bg-red-500' : 'bg-gray-300 hover:bg-red-400'
            } transition`}
          >
            <div className='flex gap-2 items-center'>
              {userWishlist.loading && clickedProduct === product._id ? (
                <Loader2 className='animate-spin' />
              ) : (
                <>
                  <FaHeart />
                  <TooltipContent side='left' className='relative bottom-2'>
                    {userId && !productInWishList
                      ? isLocaleBengali
                        ? 'ইচ্ছা তালিকায় যোগ করা'
                        : 'Add to wishlist'
                      : userId && productInWishList
                      ? isLocaleBengali
                        ? 'ইচ্ছা তালিকা থেকে সরান'
                        : 'Remove from wishlist'
                      : isLocaleBengali
                      ? 'প্রথমে লগ ইন করুন'
                      : 'Log in first'}
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
export default ProductWishlistButton
