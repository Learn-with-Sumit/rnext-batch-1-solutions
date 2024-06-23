import useStock from '@/hooks/product-hooks/useStock'
import { convertToBengali } from '@/utils/convertNumsToBengali'
import { Loader2 } from 'lucide-react'

const StockCount = ({
  product,
  isLocaleBengali,
}: {
  product: IProduct
  isLocaleBengali: boolean
}) => {
  const { data, isLoading, isError } = useStock(product)

  const loadedData = data?.data
  const stock = data?.data?.stock
  const hasStock = stock > 0

  let content = null

  if (isLoading && !isError) {
    content = <Loader2 className='animate-spin' />
  }

  if (!isLoading && isError) {
    content = <p className='italic text-red-500'>Stock Error</p>
  }

  if (!isLoading && !isError && loadedData) {
    content = (
      <p className='text-gray-500 text-sm'>
        {isLocaleBengali ? 'উপলভ্যতা: ' : 'Availability: '}
        <span className={`${hasStock ? 'text-green-600' : 'text-red-500'}`}>
          {hasStock
            ? isLocaleBengali
              ? `কার্টে আছে (${convertToBengali(stock)})`
              : `In Stock (${stock})`
            : isLocaleBengali
            ? 'মজুত শেষ'
            : 'Out of Stock'}
        </span>
      </p>
    )
  }

  return content
}
export default StockCount
