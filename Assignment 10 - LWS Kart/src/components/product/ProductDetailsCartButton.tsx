'use client'
import useAddToCart from '@/hooks/cart-hooks/useAddToCart'
import { Loader2 } from 'lucide-react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import MotionButton from '../home/MotionButton'

const ProductDetailsCartButton = ({
  product,
  userId,
  setQuantity,
}: IWishListButtonProp) => {
  const { id } = useParams()
  const { userCart, handleAddToCart } = useAddToCart(product)
  const router = useRouter()
  const pathname = usePathname()

  const hasStock = product.stock_count > 0

  const localeIsBangla = pathname.includes('/bn')

  const matchedProductWithQuantityMoreThanOne =
    userCart?.quantity?.productId === id && userCart?.quantity?.quantity > 1

  const handleClick = async () => {
    if (matchedProductWithQuantityMoreThanOne) {
      const productWithQuantity = {
        ...product,
        quantity: userCart.quantity.quantity,
      }
      await handleAddToCart(userId, productWithQuantity)
    } else {
      const productWithQuantity = {
        ...product,
        quantity: 1,
      }
      await handleAddToCart(userId, productWithQuantity)
    }
    // reset the local quantity
    setQuantity(1)
    // shows the new data after adding to cart
    router.refresh()
  }

  // define translations
  const translations = {
    en: {
      addToCart: 'Add to Cart',
      outOfStock: 'Out of Stock',
    },
    bn: {
      addToCart: 'কার্টে যোগ করুন',
      outOfStock: 'স্টক আউট',
    },
  }

  // determine current locale translations
  const t = localeIsBangla ? translations.bn : translations.en

  return userCart.loading ? (
    <button
      className={
        'bg-gray-500 border border-primary text-white px-8 py-2 font-medium rounded uppercase items-center gap-2 hover:bg-blue-600 transition min-w-48 flex justify-center'
      }
    >
      <Loader2 className='animate-spin' />
    </button>
  ) : (
    <MotionButton
      disabled={!hasStock}
      clickFunction={handleClick}
      icon={hasStock ? 'cart' : 'stockOut'}
      text={hasStock ? t.addToCart : t.outOfStock}
      className={`${
        hasStock
          ? 'bg-blue-500 hover:bg-blue-600'
          : 'bg-gray-500 cursor-not-allowed'
      } border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 transition`}
    />
  )
}
export default ProductDetailsCartButton
