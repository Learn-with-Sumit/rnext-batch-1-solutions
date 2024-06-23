import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import useAddToCartHoverMenu from '@/hooks/cart-hooks/useAddToCartHoverMenu'
import { convertToBengali } from '@/utils/convertNumsToBengali'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Button } from '../ui/button'

export function AddToCartHoverMenu({
  product,
  userId,
  isLocaleBengali,
}: IAddToCartHoverMenu) {
  const {
    isLoading,
    isError,
    hasStock,
    product_name,
    handleIncreaseQuantity,
    handleButtonClick,
    isAdding,
    handleDecreaseQuantity,
    setOpen,
    stock,
    quantity,
    open,
  } = useAddToCartHoverMenu(product, userId)

  return (
    <HoverCard
      open={!isLoading && !isError && open}
      onOpenChange={() => setOpen(!open)}
      openDelay={10}
    >
      <HoverCardTrigger>
        {isLoading && !isError ? (
          <Loader2 className='animate-spin' />
        ) : isError ? (
          <p className='italic min-w-32 text-red-500'>Error</p>
        ) : (
          <button
            disabled={!hasStock}
            className={`px-6 py-2 text-center text-sm ${
              hasStock
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-gray-500 cursor-not-allowed'
            } text-white border border-primary rounded hover:text-primary transition uppercase font-roboto font-medium`}
          >
            {hasStock
              ? isLocaleBengali
                ? 'কার্টে যোগ করুন'
                : 'add to cart'
              : isLocaleBengali
              ? 'মজুত শেষ'
              : 'stock out'}
          </button>
        )}
      </HoverCardTrigger>
      <HoverCardContent
        className={`w-80 relative z-50 bottom-3 ${
          hasStock ? 'block' : 'hidden'
        }`}
      >
        <div className='flex justify-between space-x-4 '>
          <div className='space-y-1 m-auto flex flex-col items-center'>
            <p className='text-blue-500'>{product_name}</p>
            <div className='flex border border-gray-300 text-gray-600 dark:text-white divide-x divide-gray-300 w-max'>
              <motion.button
                key='minus'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleDecreaseQuantity}
                className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none hover:text-white hover:bg-blue-500 transition-all duration-200 border-r'
              >
                <AiOutlineMinus />
              </motion.button>

              <motion.div
                key={quantity}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className='h-8 w-8 text-base flex items-center justify-center border-none'
              >
                {isLocaleBengali ? convertToBengali(quantity) : quantity}
              </motion.div>
              {/* remove the button when out of stock while user is adding */}
              {stock > quantity && (
                <motion.button
                  key='plus'
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleIncreaseQuantity}
                  className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none hover:text-white hover:bg-blue-500 transition-all duration-200'
                >
                  <AiOutlinePlus />
                </motion.button>
              )}
            </div>
            <Button
              disabled={isAdding === product._id}
              onClick={handleButtonClick}
              variant='secondary'
              className='hover:bg-green-500 hover:text-white'
            >
              {isAdding === product._id ? (
                <Loader2 className='animate-spin' />
              ) : (
                <p>{isLocaleBengali ? 'নিশ্চিত করুন' : 'Confirm'}</p>
              )}
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
