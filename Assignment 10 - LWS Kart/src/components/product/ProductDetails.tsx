import { getDictionary } from '@/app/[lang]/dictionaries'
import { auth } from '@/auth'
import Link from 'next/link'
import ProductImages from './ProductImages'
import ProductShareButtons from './ProductShareButtons'
import Quantity from './Quantity'
import ReviewsButton from './ReviewsButton'

const ProductDetails = async ({
  product,
  lang,
}: {
  product: IProduct
  lang: ILang['lang']
}) => {
  const {
    productDetailsPage: {
      availability,
      brand: brandLocale,
      category: categoryLocale,
      sku: skuLocale,
      noStock: noStockLocale,
    },
    wishlist: wishlistLocale,
  } = await getDictionary(lang)

  const session = (await auth()) as SessionWith_Id

  const {
    product_name,
    stock_count,
    brand,
    category,
    SKU,
    price,
    discount_price,
    description,
    image,
    otherImages,
    reviews: productReviews,
  } = product

  const userId = session?.user?._id?.toString() ?? session?.user?.id?.toString()

  return (
    <div className='container grid grid-cols-2 gap-6'>
      <ProductImages image={image} otherImages={otherImages as string[]} />
      <div>
        <h2 className='text-3xl font-medium uppercase mb-2 dark:text-white'>
          {product_name}
        </h2>
        <div className='flex items-center mb-4 dark:text-white'>
          <ReviewsButton
            productReviews={productReviews as IReviews['reviews']}
          />
        </div>
        <div className='space-y-2'>
          <p className='text-gray-800 dark:text-white font-semibold space-x-2'>
            <span>{availability}:</span>
            <span
              className={`${
                stock_count > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stock_count > 0 ? `In Stock (${stock_count})` : noStockLocale}
            </span>
          </p>
          <p className='space-x-2'>
            <span className='text-gray-800 dark:text-white font-semibold'>
              {brandLocale}:{' '}
            </span>
            <span className='text-gray-600 dark:text-white'>{brand}</span>
          </p>
          <p className='space-x-2'>
            <span className='text-gray-800 font-semibold dark:text-white'>
              {categoryLocale}:
            </span>
            <Link
              href={`/${lang}/shop?category=${category}`}
              className='text-blue-500 underline underline-offset-4'
            >
              {category}
            </Link>
          </p>
          <p className='space-x-2'>
            <span className='text-gray-800 font-semibold dark:text-white'>
              {skuLocale}:{' '}
            </span>
            <span className='text-gray-600 dark:text-white'>{SKU}</span>
          </p>
        </div>
        <div className='flex items-baseline mb-1 space-x-2 font-roboto mt-4'>
          <p className='text-xl text-primary font-semibold'>${price}</p>
          <p className='text-base text-gray-400 line-through'>
            ${discount_price}
          </p>
        </div>
        <p className='mt-4 text-gray-600 dark:text-white'>{description}</p>
        <Quantity
          product={product}
          wishlistLocale={wishlistLocale}
          userId={userId}
          stock={stock_count}
        />
        <ProductShareButtons />
      </div>
    </div>
  )
}
export default ProductDetails
