import { useContext } from 'react'
import { SearchContext } from '../../context/index.js'

const Error = () => {
  const { setSearchValue } = useContext(SearchContext)

  return (
    <section className='bg-white dark:bg-gray-900 '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div>
          <p className=' font-medium text-red-500 dark:text-red-400 text-7xl'>
            404 error
          </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
            We could not find your news
          </h1>
          <div className='flex items-center mt-6 gap-x-3'>
            <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>
              <a onClick={() => setSearchValue('')}>Go back</a>
              {/* resets the search input */}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Error
