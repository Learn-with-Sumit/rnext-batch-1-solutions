import { ProductModel } from '@/app/models/productModel'
import LinkButtons from '@/components/admin/LinkButtons'
import PriceChart from '@/components/admin/PriceChart'
import connectMongo from '@/db/connectMongo'
import revokeUserInAdminPanel from '@/utils/revokeUserInAdminPanel'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { getDictionary } from '../../../dictionaries'

const PriceChartPage = async ({
  params: { lang },
}: {
  params: { lang: ILang['lang'] }
}) => {
  await revokeUserInAdminPanel()
  await connectMongo()
  // get all products
  const products = await ProductModel.find()

  const {
    adminPage: { price_chart, product_list },
  } = await getDictionary(lang)

  return (
    <main className='min-h-[50vh] mx-20 md:mx-40 lg:mx-60 mt-12 xl:mx-60 2xl:mx-96'>
      <LinkButtons
        priceChartLocale={price_chart}
        productListLocale={product_list}
        lang={lang}
      />
      <Suspense fallback={<Loader2 className='animate-spin' />}>
        <PriceChart products={JSON.parse(JSON.stringify(products))} />
      </Suspense>
    </main>
  )
}
export default PriceChartPage
