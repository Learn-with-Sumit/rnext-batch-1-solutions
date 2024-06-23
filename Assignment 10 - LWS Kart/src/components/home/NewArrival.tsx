import { getDictionary } from '@/app/[lang]/dictionaries'
import { getSelectedProducts } from '@/db/queries/product.queries'
import { NEW_ARRIVAL } from '@/utils/constants'
import MotionButton from './MotionButton'
import NewArrivalProducts from './NewArrivalProducts'

const NewArrival = async ({ lang }: ILang) => {
  const products = await getSelectedProducts(NEW_ARRIVAL)

  const { arrival } = await getDictionary(lang)

  return (
    <div className='container pb-16'>
      <h2 className='text-2xl font-medium text-gray-800 uppercase mb-6 dark:text-white'>
        {arrival}
      </h2>
      <div className='grid grid-cols-1 gap-6'>
        <NewArrivalProducts products={products} lang={lang} />
        <div className='flex justify-center items-center'>
          <MotionButton
            href={`${process.env.BASE_URL}/${lang}/shop?sort=new_arrival`}
            className='text-blue-500 flex gap-2 text-sm bg-slate-200 p-2 rounded-md items-center'
            text='See More'
            icon='arrow-right'
          />
        </div>
      </div>
    </div>
  )
}
export default NewArrival
