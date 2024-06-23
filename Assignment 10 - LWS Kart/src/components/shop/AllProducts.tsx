import { getAllProducts } from '@/db/queries/product.queries'
import createSearchParamsObjectForProducts from '@/utils/createSearchParamsObjectForProducts'
import Product from '../product/Product'

const AllProducts = async ({
  lang,
  searchParams,
}: {
  lang: ILang['lang']
  searchParams: IShopSearchParams
}) => {
  const products = await getAllProducts(
    createSearchParamsObjectForProducts(searchParams)
  )

  return products.map((product: IProduct) => (
    <Product
      lang={lang}
      product={JSON.parse(JSON.stringify(product))}
      key={product._id}
    />
  ))
}
export default AllProducts
