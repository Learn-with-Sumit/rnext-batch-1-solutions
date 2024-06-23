import { getDictionary } from '@/app/[lang]/dictionaries'
import { getAllCategories } from '@/db/queries/product.queries'
import getCategoryIcon from '@/utils/getCategoryIcons'
import Image from 'next/image'
import Link from 'next/link'

export type FilterKeys =
  | 'categories'
  | 'Kitchen'
  | 'Living Room'
  | 'Mattress'
  | 'Outdoor'
  | 'Sofa'

const Categories = async ({ lang }: ILang) => {
  const categories: ICategory[] = await getAllCategories()
  const { category, filter } = await getDictionary(lang)

  const categoryNames = categories.map((cat) => Object.keys(cat)).flat()

  return (
    <div className='container py-16'>
      <h2 className='text-2xl font-medium text-gray-800 dark:text-white uppercase mb-6'>
        {category}
      </h2>
      <div className='grid grid-cols-3 gap-3'>
        {categoryNames.map((category, index) => (
          <div
            key={category}
            className='relative rounded-sm overflow-hidden group overflow:hidden hover:-translate-y-1 hover:rounded-lg hover:scale-[102%] duration-200 focus:scale-[95%] dark:shadow-sm dark:shadow-white'
          >
            <Image
              width={1200}
              height={1200}
              src={`/images/category/category-${index + 1}.jpg`}
              alt={`category ${index + 1}`}
              className='w-full object-contain group-hover:scale-105 transition-all duration-300 group-hover:animate-pulse'
            />
            <Link
              href={`/${lang}/shop?category=${category}`}
              className='absolute inset-0 bg-black bg-opacity-40 group gap-2 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition'
            >
              <div className='relative flex items-center gap-1 z-10'>
                <p className='group-hover:animate-fadeUp'>
                  {filter[category as FilterKeys]}
                </p>
                <p className='group-hover:rotate-180 duration-300 transition-all group-hover:scale-105 group-hover:text-red-500'>
                  {getCategoryIcon(category)}
                </p>
              </div>
              <div className='absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100'>
                <div className='absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 opacity-30 blur-xl'></div>
                <div className='absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 opacity-10'></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Categories
