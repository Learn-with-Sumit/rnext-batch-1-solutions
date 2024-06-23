import { removeProductFromCart } from '@/app/actions/cart.actions'
import { useCheckoutQuantityButton } from '@/hooks/cart-hooks/useCheckoutQuantityButton'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdCheck, MdDelete } from 'react-icons/md'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

const QuantityButton = ({
  product,
  userId,
}: {
  product: IProductWithQuantity
  userId: string
}) => {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)
  const {
    cartProduct,
    currentQuantity,
    emoji,
    isLoading,
    stock,
    handleIncrease,
    handleDecrease,
    handleAddToCart,
    originalQuantity,
  } = useCheckoutQuantityButton({ product, userId })

  const handleDelete = async () => {
    setDeleting(true)
    await removeProductFromCart(userId, product._id, true)
    setDeleting(false)

    router.refresh()
  }

  return (
    <section className='flex items-center space-x-2 relative min-w-[224px]'>
      <div className='flex gap-2 items-center justify-between w-full'>
        <div className='flex gap-2 items-center'>
          <Button
            variant='outline'
            onClick={handleDecrease}
            className='px-3 bg-rose-500 text-white'
          >
            -
          </Button>
          <p>{cartProduct.quantity}</p>
          <AnimatePresence>
            {emoji && (
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: -50 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.5 }}
                className='absolute top-0 left-6 transform -translate-x-1/2'
              >
                <span className='text-2xl'>{emoji}</span>
              </motion.div>
            )}
          </AnimatePresence>
          {currentQuantity < stock && (
            <Button
              variant='outline'
              onClick={handleIncrease}
              className='px-3 bg-blue-500 text-white'
            >
              +
            </Button>
          )}
          {cartProduct.quantity !== originalQuantity && (
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <div
                    onClick={() =>
                      handleAddToCart(userId, {
                        ...product,
                        quantity: cartProduct.quantity - originalQuantity,
                      } as IProductWithQuantity)
                    }
                    className='px-2 py-1 bg-green-500 text-xl rounded-md text-white'
                  >
                    <MdCheck />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className='text-sm'>Confirm</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {/* delete button */}
          <Button
            disabled={deleting}
            onClick={handleDelete}
            className='absolute -right-24'
            variant={'destructive'}
          >
            {deleting ? (
              <Loader2 className='animate-spin' />
            ) : (
              <MdDelete className='text-sm' />
            )}
          </Button>
        </div>
        {isLoading ? (
          <Loader2 className='animate-spin text-sm' />
        ) : (
          <Badge className='self-center'>In stock: {stock}</Badge>
        )}
      </div>
    </section>
  )
}

export default QuantityButton
