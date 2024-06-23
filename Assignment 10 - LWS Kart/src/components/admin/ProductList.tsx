import { ProductModel } from '@/app/models/productModel'
import connectMongo from '@/db/connectMongo'
import {
  getProductsCount,
  getSearchedProducts,
} from '@/db/queries/product.queries'
import LoadMore from './LoadMore'
import Product from './Product.Admin'

const ProductList = async ({
  query,
  lang,
  limit = 10,
}: {
  query: string
  lang: ILang['lang']
  limit: number
}) => {
  await connectMongo()
  const productCount = await getProductsCount()
  let products

  if (query) {
    products = await getSearchedProducts(query)
  } else {
    products = await ProductModel.find().limit(limit)
  }

  const noProducts = products.length === 0

  if (noProducts) {
    return (
      <p>
        {lang === 'en'
          ? 'No Products for : '
          : 'কোন পন্য খুজে পাওয়া যায়নি আপনার '}{' '}
        <span className='italic text-blue-500'>{query}</span>
        {lang === 'bn' && ' কুয়েরির জন্য'}{' '}
      </p>
    )
  } else {
    return (
      <>
        {products.map((product: IProduct, index: number) => (
          <Product
            key={product._id}
            index={index}
            product={JSON.parse(JSON.stringify(product))}
          />
        ))}
        {/* intersect this to load 10 more product and so on */}
        <LoadMore count={productCount} limit={limit} />
      </>
    )
  }
}

export default ProductList
