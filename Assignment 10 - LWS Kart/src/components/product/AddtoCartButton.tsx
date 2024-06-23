'use client'
import useAddToCart from '@/hooks/cart-hooks/useAddToCart'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { FaCartArrowDown } from 'react-icons/fa'
import { MdDangerous } from 'react-icons/md'

const AddtoCartButton = ({
  priceIsHigh,
  product,
  session,
}: {
  priceIsHigh: boolean
  product: IProductWithQuantity
  session: SessionWith_Id
}) => {
  const { lang } = useParams()
  const userId = session?.user?._id?.toString() ?? session?.user?.id?.toString()

  const [clickedProduct, setClickedProduct] = useState('')
  const [buttonHovered, setButtonHovered] = useState(false)

  const { userCart, handleAddToCart } = useAddToCart(product)

  const matchedProductWithQuantityMoreThanOne =
    userCart?.quantity?.productId === product._id &&
    userCart?.quantity?.quantity > 1

  const hasStock = product.stock_count > 0

  const handleClick = async () => {
    if (userCart.loading) {
      return
    }
    setClickedProduct(product._id)
    if (matchedProductWithQuantityMoreThanOne) {
      const productWithQuantity = {
        ...product,
        quantity: userCart.quantity.quantity,
      }
      await handleAddToCart(userId, productWithQuantity as IProductWithQuantity)
      setClickedProduct('')
    } else {
      const productWithQuantity = {
        ...product,
        quantity: 1,
      }
      await handleAddToCart(userId, productWithQuantity as IProductWithQuantity)
      setClickedProduct('')
    }
  }

  return (
    <>
      <motion.button
        disabled={!hasStock}
        onClick={handleClick}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        whileHover={{ height: 50 }}
        className={`block w-full py-1 text-center text-white bg-primary border border-primary rounded-b ${
          hasStock
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-gray-500 cursor-not-allowed'
        }  hover:text-primary transition`}
      >
        {userCart.loading && product._id === clickedProduct ? (
          <Loader2 className='animate-spin text-center m-auto' />
        ) : (
          <div className='flex gap-2 items-center justify-center'>
            <motion.em
              initial={{ marginLeft: '24px' }}
              animate={{ marginLeft: buttonHovered ? '12px' : '24px' }}
            >
              {hasStock
                ? lang === 'en'
                  ? 'Add to cart'
                  : 'কার্টে যোগ করুন'
                : lang === 'en'
                ? 'Out of Stock'
                : 'স্টকে নেই'}
            </motion.em>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: buttonHovered ? 1 : 0,
                scale: buttonHovered ? 1 : 0,
              }}
            >
              {hasStock ? (
                <FaCartArrowDown className='text-xl' />
              ) : (
                <MdDangerous className='text-xl' />
              )}
            </motion.div>
          </div>
        )}
      </motion.button>
      <motion.p
        className='text-center'
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: buttonHovered ? 1 : 0,
          height: buttonHovered ? 24 : 0,
        }}
      >
        {priceIsHigh
          ? lang === 'en'
            ? 'Pocket gorom? 🔥'
            : 'পকেট গরম? 🔥'
          : lang === 'en'
          ? 'Just do it! 🙄'
          : 'জলদি কিনুন! 🙄'}
      </motion.p>
    </>
  )
}

export default AddtoCartButton
