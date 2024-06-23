import { getDictionary } from '@/app/[lang]/dictionaries'

const ProductDescription = async ({
  description,
  lang,
}: {
  description: string
  lang: ILang['lang']
}) => {
  const {
    productDetailsPage: { productDetails },
  } = await getDictionary(lang)
  return (
    <div className='container pb-16 '>
      <h3 className='border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium mt-12 dark:text-white'>
        {productDetails}
      </h3>
      <div className='w-3/5 pt-6'>
        <div className='text-gray-600 dark:text-white'>
          <p className='dark:text-white'>{description}</p>
        </div>
      </div>
    </div>
  )
}
export default ProductDescription
