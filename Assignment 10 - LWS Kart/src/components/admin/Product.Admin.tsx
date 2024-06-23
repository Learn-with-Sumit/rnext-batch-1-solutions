import { Card, CardContent, CardHeader } from '@/components/ui/card'
import createImgBlur from '@/utils/createImgBlur'
import { DollarSign } from 'lucide-react'
import Image from 'next/image'
import { RiDiscountPercentFill } from 'react-icons/ri'
import ReviewsButton from '../product/ReviewsButton'
import { Label } from '../ui/label'
import AdminProductCategory from './ProductCategory.Admin'
import ProductDelete from './ProductDelete'
import ProductName from './ProductName'
import ProductStockAdmin from './ProductStock.Admin'
const Product = async ({ product, index }: IAdminProduct) => {
  const { price, discount_price, reviews, image } = product
  const imgBlur = await createImgBlur(image)
  return (
    <Card className='w-[350px] flex flex-col justify-between pt-8 min-h-80 bg-gradient-to-r from-sky-400 to-cyan-300'>
      <CardHeader>
        <Image
          width={600}
          height={600}
          placeholder='blur'
          blurDataURL={`data:image/png;base64,${imgBlur}`}
          src={image}
          alt='product 1'
          className='w-full h-[230px] object-cover group-hover:scale-105 duration-200 transition-all'
        />
        <ProductName product={product} index={index} />
        <div className='flex gap-2'>
          <AdminProductCategory product={product} />
          <ReviewsButton
            productId={product._id}
            role='admin'
            productReviews={reviews as IReviews['reviews']}
          />
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex space-y-1.5 justify-between items-center'>
              <div className='space-y-2'>
                <Label className='flex gap-2 items-center' htmlFor='name'>
                  <DollarSign className='size-7 bg-white rounded-full shadow-md' />
                  {price.toFixed(2)}
                </Label>
                <Label className='flex gap-2 items-center' htmlFor='name'>
                  <RiDiscountPercentFill className='size-7 bg-white rounded-full shadow-md' />
                  {discount_price.toFixed(2)}
                </Label>
              </div>
              <ProductStockAdmin product={product} />
            </div>
          </div>
        </form>
      </CardContent>
      <ProductDelete product={product} />
    </Card>
  )
}
export default Product
