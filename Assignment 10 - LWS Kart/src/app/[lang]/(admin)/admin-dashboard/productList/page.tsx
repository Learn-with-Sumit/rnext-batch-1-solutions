import { AddProductDialog } from '@/components/admin/AddProductForm'
import AdminSearch from '@/components/admin/AdminSearch'
import LinkButtons from '@/components/admin/LinkButtons'
import ProductList from '@/components/admin/ProductList'
import revokeUserInAdminPanel from '@/utils/revokeUserInAdminPanel'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { getDictionary } from '../../../dictionaries'

const ProductListPage = async ({
  params: { lang },
  searchParams: { query, limit },
}: {
  params: { lang: ILang['lang'] }
  searchParams: { query: string; limit: number }
}) => {
  await revokeUserInAdminPanel()
  const {
    adminPage: { price_chart, product_list },
  } = await getDictionary(lang)

  return (
    <main className='min-h-[50vh] mx-60 mt-12 mb-6 '>
      <LinkButtons
        priceChartLocale={price_chart}
        productListLocale={product_list}
        lang={lang}
      />
      <AddProductDialog />
      <div className='flex justify-between'>
        <h2 className='my-6 text-xl'>{product_list}</h2>
        <AdminSearch />
      </div>
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-2'>
        <Suspense key={query} fallback={<Loader2 className='animate-spin' />}>
          <ProductList limit={limit} lang={lang} query={query} />
        </Suspense>
      </section>
    </main>
  )
}
export default ProductListPage
