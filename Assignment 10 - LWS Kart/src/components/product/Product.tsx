import { getDictionary } from '@/app/[lang]/dictionaries'
import { auth } from '@/auth'
import createImgBlur from '@/utils/createImgBlur'
import getProductDiscountPercentage from '@/utils/getProductDiscountPercentage'
import getReviewStars from '@/utils/getReviewStars'
import Link from 'next/link'
import { MdDiscount } from 'react-icons/md'
import { Badge } from '../ui/badge'
import { DirectionAwareHover } from '../ui/image-hover'
import AddtoCartButton from './AddtoCartButton'
import ProductWishlistButton from './ProductWishlistButton'

import { Card, CardContent } from '@/components/ui/card'
import getAvgReviewStars from '@/utils/getAvgReviewStars'

const Product = async ({
  product,
  lang,
}: {
  product: IProduct
  lang?: ILang['lang']
}) => {
  const session = await auth()
  const {
    _id: id,
    product_name,
    price,
    discount_price,
    image,
    reviews,
    stock_count,
    trending,
    new_arrival,
  } = product

  const hasStock = stock_count > 0

  // locales
  const { trending: trendingLocale, new_text } = await getDictionary(lang!)

  // needed to show a hover message on add to cart hover
  const priceIsHigh = discount_price > 300
  const discountPercentage = getProductDiscountPercentage(price, discount_price)
  const imgBlur = await createImgBlur(image)

  return (
    <Card className='w-full pt-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 '>
      <CardContent className='p-3 shadow-md '>
        <div className='bg-white shadow rounded overflow-hidden group dark:*:bg-slate-800'>
          <div className='relative'>
            <Link href={`/product-details/${id}`}>
              <DirectionAwareHover
                imageClassName={`${!hasStock ? 'grayscale' : 'grayscale-0'}`}
                imgBlur={imgBlur}
                imageUrl={image}
              />
            </Link>
          </div>

          <div className='pt-4 px-4 h-52'>
            <div className='flex justify-between'>
              <div className='space-x-2'>
                {trending && (
                  <Badge className='bg-orange-500 hover:bg-orange-400'>
                    {trendingLocale}
                  </Badge>
                )}
                {new_arrival && (
                  <Badge className='bg-green-600 hover:bg-green-400'>
                    {new_text}
                  </Badge>
                )}
              </div>
              <div className='flex gap-2'>
                <ProductWishlistButton
                  session={session as SessionWith_Id}
                  product={product}
                />
              </div>
            </div>

            <Link href={`/product-details/${id}`}>
              <h4 className='uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition dark:text-white'>
                {product_name}
              </h4>
            </Link>
            <div className='flex items-baseline mb-1 space-x-2'>
              <p className='text-xl text-primary font-semibold '>
                ${discount_price.toFixed(2)}
              </p>
              <p className='text-sm text-gray-400 line-through'>${price}</p>
              <Badge className='bg-rose-500 space-x-1 hover:bg-rose-400'>
                <MdDiscount />
                <p>-{discountPercentage.toFixed(2)}%</p>
              </Badge>
            </div>
            <div className='flex items-center'>
              <div className='flex gap-1 text-sm text-yellow-400'>
                {/* show the average rating */}
                {getAvgReviewStars(reviews as any[])}
              </div>
              {reviews?.length! > 0 && (
                <div className='text-xs text-gray-500 ml-3'>
                  ({reviews?.length})
                </div>
              )}
            </div>
          </div>
          <AddtoCartButton
            session={session as SessionWith_Id}
            product={product as IProductWithQuantity}
            priceIsHigh={priceIsHigh}
          />
        </div>
      </CardContent>
    </Card>
  )
}
export default Product
