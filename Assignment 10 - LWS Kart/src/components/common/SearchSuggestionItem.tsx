import getProductDiscountPercentage from '@/utils/getProductDiscountPercentage'
import Image from 'next/image'
import Link from 'next/link'
import { MdDiscount } from 'react-icons/md'
import { Badge } from '../ui/badge'

const SearchSuggestionItem = ({ product }: { product: IProduct }) => {
  return (
    <Link
      className='flex items-center gap-2 p-2 rounded-md cursor-pointer text-black hover:bg-gray-100 transition-all duration-300 shadow-md'
      href={`/product-details/${product._id}`}
    >
      <Image
        className='size-24 object-cover hover:size-36 duration-300 transition-all'
        src={product.image}
        alt='Product image'
        height={200}
        width={200}
      />
      <div className='flex-col text-xs gap-4'>
        <p className='text-blue-500 text-md font-semibold'>
          {product.product_name}
        </p>
        <div>
          {product.trending && (
            <Badge className='bg-orange-500 hover:bg-orange-400'>
              {'Trending'}
            </Badge>
          )}
          {product.new_arrival && (
            <Badge className='bg-green-600 hover:bg-green-400'>{'New'}</Badge>
          )}
          <div className='flex items-baseline flex-wrap mb-1 space-x-2'>
            <p className='text-md text-primary font-semibold'>
              ${product.discount_price.toFixed(2)}
            </p>
            <p className='text-sm text-gray-400 line-through'>
              ${product.price.toFixed(2)}
            </p>
            <Badge className='bg-rose-500 space-x-1 hover:bg-rose-400'>
              <MdDiscount />
              <p>
                -
                {getProductDiscountPercentage(
                  product.price,
                  product.discount_price
                ).toFixed(2)}
                %
              </p>
            </Badge>
          </div>
        </div>
      </div>
    </Link>
  )
}
export default SearchSuggestionItem
