import { Breadcrumb, ShopWrapper, Sidebar } from '@/components'
import { ProductCount } from '@/components/product/ProductCount'
import ProductLimit from '@/components/product/ProductLimit'
import ProductsList from '@/components/shop/Products'
import ProductSorter from '@/components/shop/ProductSorter'
import ShopPagination from '@/components/shop/ShopPagination'
import { getAllProducts, getProductsCount } from '@/db/queries/product.queries'
import FilterProvider from '@/providers/FilterProvider'
import createSearchParamsObjectForProducts from '@/utils/createSearchParamsObjectForProducts'
import revokeAdminIsUsersPages from '@/utils/revokeAdminIsUsersPages'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: IShopSearchParams
}) {
  const products = await getAllProducts(
    createSearchParamsObjectForProducts(searchParams)
  )

  const noProducts = products.length === 0

  if (!noProducts) {
    return {
      title: products
        ?.slice(1, 10)
        ?.map((product) => product.product_name)
        ?.join(', '),
    }
  } else {
    return {
      title: 'empty',
    }
  }
}

const ShopPage = async ({
  searchParams,
  params: { lang },
}: {
  searchParams: IShopSearchParams
  params: { lang: ILang['lang'] }
}) => {
  await revokeAdminIsUsersPages()

  const productCount = await getProductsCount(
    createSearchParamsObjectForProducts(searchParams)
  )

  const products = await getAllProducts(
    createSearchParamsObjectForProducts(searchParams)
  )

  return (
    <main className='min-h-[40vh] dark:bg-slate-800'>
      <FilterProvider>
        <div className='flex justify-evenly md:px-24 xl:px-48 gap-2 items-center'>
          <Breadcrumb />
          <ProductCount
            lang={lang}
            products={JSON.parse(JSON.stringify(products))}
          />
          <ProductSorter />
          <ProductLimit length={productCount} />
        </div>
        <ShopWrapper>
          {/* <DrawerTrigger /> */}
          <Sidebar lang={lang} />
          <ProductsList lang={lang} searchParams={searchParams} />
        </ShopWrapper>
        <ShopPagination productCount={productCount} />
      </FilterProvider>
    </main>
  )
}
export default ShopPage
