import { useContext } from 'react'
import { SearchContext } from '../../context/index.js'

const EmptyResponse = () => {
  const { setSearchValue } = useContext(SearchContext)

  return (
    <div className='max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800 min-h-96 m-auto flex justify-center flex-col items-center'>
      <div className='mt-2'>
        <p className='text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200'>
          Sorry, No News Found for your query
        </p>
        <p className='mt-2 text-gray-600 dark:text-gray-300'></p>
      </div>
      <div className='flex items-center justify-between mt-4'>
        <a
          onClick={() => setSearchValue('')} // resets the search input
          className='text-blue-600 dark:text-blue-400 hover:underline cursor-pointer'
          tabIndex={0}
          role='link'
        >
          Go Back
        </a>
      </div>
    </div>
  )
}
export default EmptyResponse
