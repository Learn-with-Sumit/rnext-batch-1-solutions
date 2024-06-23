import AllProducts from '@/components/shop/AllProducts'
import NoProducts from '@/components/shop/NoProducts'
import ProductWrapper from '@/components/shop/ProductWrapper'
import { getAllProducts } from '@/db/queries/product.queries'
import createSearchParamsObjectForProducts from '@/utils/createSearchParamsObjectForProducts'
import { getSuspenseKey } from '@/utils/getSuspenseKey'
import { Suspense } from 'react'
import ProductSkeleton from './ProductSkeleton'

const ProductsList = async ({
  lang,
  searchParams,
}: {
  lang: ILang['lang']
  searchParams: IShopSearchParams
}) => {
  const products = await getAllProducts(
    createSearchParamsObjectForProducts(searchParams)
  )

  // if key changes for searchparams, the suspense will trigger
  const suspenseKey = getSuspenseKey(searchParams)

  const noProducts = products.length === 0

  return noProducts ? (
    <div>
      <NoProducts />
    </div>
  ) : (
    <ProductWrapper>
      <Suspense key={suspenseKey} fallback={<ProductSkeleton />}>
        <AllProducts lang={lang} searchParams={searchParams} />
      </Suspense>
    </ProductWrapper>
  )
}
export default ProductsList
