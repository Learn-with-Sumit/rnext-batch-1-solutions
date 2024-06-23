'use client'
import getProductDiscountPercentage from '@/utils/getProductDiscountPercentage'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdDiscount } from 'react-icons/md'
import { Badge } from '../ui/badge'

const RandomAdvertiseText = ({ product }: { product: IProduct }) => {
  const { price, discount_price, product_name, _id } = product
  const pathname = usePathname()

  const isLocaleBengali = pathname.includes('/bn')

  const discountPercentage = getProductDiscountPercentage(price, discount_price)

  return (
    <motion.div
      className='whitespace-nowrap absolute left-0 w-auto'
      animate={{
        x: '100vw',
        transition: { duration: 10, repeat: Infinity, ease: 'linear' },
      }}
    >
      <Link href={`/product-details/${_id}`}>
        <motion.span className='absolute text-blue-500  font-bold drop-shadow-md top-3'>
          <span className='bg-black px-2 py-1 text-white rounded-md mr-2'>
            {product_name}
          </span>{' '}
          {isLocaleBengali
            ? 'ছাড়ে বিক্রি হচ্ছে'
            : 'is on sale with a discount of'}
          <Badge className='bg-rose-500 space-x-1 hover:bg-rose-400 mx-2'>
            <MdDiscount />
            <p>-{discountPercentage.toFixed(2)}%</p>
          </Badge>
          {!isLocaleBengali && 'for'} {discount_price}{' '}
          {isLocaleBengali && 'ডলারের জন্য'}
        </motion.span>
      </Link>
    </motion.div>
  )
}
export default RandomAdvertiseText
