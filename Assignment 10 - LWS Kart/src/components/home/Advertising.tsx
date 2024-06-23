import { getRandomLowDiscountProduct } from '@/db/queries/product.queries'
import RandomAdvertiseText from './RandomAdvertiseText'

const Advertising = async () => {
  const randomDiscountedProduct = await getRandomLowDiscountProduct()

  return (
    <div className='bg-gradient-to-r from-green-300 to-yellow-300 overflow-hidden w-full h-[50px] relative'>
      <RandomAdvertiseText product={randomDiscountedProduct as IProduct} />
    </div>
  )
}

export default Advertising
