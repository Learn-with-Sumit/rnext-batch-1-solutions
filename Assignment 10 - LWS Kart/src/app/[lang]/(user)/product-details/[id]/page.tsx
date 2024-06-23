import {
  Breadcrumb,
  ProductDescription,
  ProductDetails,
  RelatedProducts,
} from '@/components'
import connectMongo from '@/db/connectMongo'
import {
  getRelatedProducts,
  getSingleProduct,
} from '@/db/queries/product.queries'
import revokeAdminIsUsersPages from '@/utils/revokeAdminIsUsersPages'

export async function generateMetadata({ params }: { params: { id: string } }) {
  // read route params
  const id = params.id

  // fetch data
  const product: IProduct = await getSingleProduct(id)

  return {
    title: product?.product_name,
    description: product?.description?.slice(0, 100),
    openGraph: {
      images: [
        {
          url: product?.image,
          width: 1200,
          height: 600,
        },
      ],
    },
  }
}

const ProductDetailsPage = async ({
  params: { id, lang },
}: {
  params: { id: string; lang: ILang['lang'] }
}) => {
  await revokeAdminIsUsersPages()
  await connectMongo()
  const product = await getSingleProduct(id)
  const relatedProducts = await getRelatedProducts(product.category, id)

  return (
    <main className='dark:bg-slate-800 dark:text-white'>
      <Breadcrumb product={JSON.parse(JSON.stringify(product))} />
      <ProductDetails
        lang={lang}
        product={JSON.parse(JSON.stringify(product))}
      />
      <ProductDescription lang={lang} description={product.description} />
      <RelatedProducts
        lang={lang}
        relatedProducts={relatedProducts as IProduct[]}
      />
    </main>
  )
}
export default ProductDetailsPage
