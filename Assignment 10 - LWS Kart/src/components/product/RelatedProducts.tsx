import { getDictionary } from '@/app/[lang]/dictionaries'
import Product from './Product'

const RelatedProducts = async ({
  relatedProducts,
  lang,
}: {
  relatedProducts: IProduct[]
  lang: ILang['lang']
}) => {
  const {
    productDetailsPage: { relatedProd },
  } = await getDictionary(lang)

  return (
    <div className='container pb-16'>
      <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6'>
        {relatedProd}
      </h2>
      <div className='grid grid-cols-4 gap-6'>
        {relatedProducts.map((product) => (
          <Product product={product} key={product._id} />
        ))}
      </div>
    </div>
  )
}
export default RelatedProducts
