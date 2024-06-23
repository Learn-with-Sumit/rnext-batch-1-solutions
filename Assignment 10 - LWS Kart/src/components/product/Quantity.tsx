'use client'

import useQuantity from '@/hooks/product-hooks/useQuantity'
import { convertToBengali } from '@/utils/convertNumsToBengali'
import { AnimatePresence, motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import ProductDetailsCartButton from './ProductDetailsCartButton'
import WishlistButton from './WishlistButton'

const Quantity = ({
  stock,
  product,
  wishlistLocale,
  userId,
}: {
  stock: number
  product: IProduct
  wishlistLocale: any
  userId: string
}) => {
  const { id, lang } = useParams()

  const isLocaleBangla = lang === 'bn'

  const {
    quantity,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    setQuantity,
  } = useQuantity(id as string)
  const hasStock = stock > 0

  return hasStock ? (
    <div className='mt-4'>
      <h3 className='text-sm text-gray-800 uppercase mb-1'>
        {isLocaleBangla ? 'পরিমাণ' : 'Quantity'}
      </h3>
      <div className='flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max dark:text-white'>
        <AnimatePresence mode='popLayout'>
          {quantity > 1 && (
            <motion.button
              key='minus'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleDecreaseQuantity}
              className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none hover:text-white hover:bg-blue-500 transition-all duration-200 border-r'
            >
              <AiOutlineMinus />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.div
          key={quantity}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className='h-8 w-8 text-base flex items-center justify-center border-none'
        >
          {isLocaleBangla ? convertToBengali(quantity) : quantity}
        </motion.div>
        {/* remove the button if stock out while user adding */}
        {quantity < stock && (
          <motion.button
            key='plus'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleIncreaseQuantity}
            className='h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none hover:text-white hover:bg-blue-500 transition-all duration-200'
          >
            <AiOutlinePlus />
          </motion.button>
        )}
      </div>
      <div className='mt-6 flex gap-3 border-b border-gray-200 pb-5 dark:text-white pt-5'>
        <ProductDetailsCartButton
          setQuantity={setQuantity}
          product={product}
          userId={userId}
        />
        <WishlistButton
          wishlistLocale={wishlistLocale}
          product={product}
          userId={userId}
        />
      </div>
    </div>
  ) : (
    <p className='text-red-500 italic'>
      {isLocaleBangla ? 'স্টক নেই' : 'STOCK OUT'}
    </p>
  )
}

export default Quantity
