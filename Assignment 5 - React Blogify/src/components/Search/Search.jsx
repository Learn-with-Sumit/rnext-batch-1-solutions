import { useContext } from 'react'
import { Link } from 'react-router-dom'
import CloseIcon from '../../assets/icons/close.svg'
import { BASE_URL } from '../../constants.js'
import { SearchContext } from '../../context/index.js'
import useSearch from '../../hooks/api/useSearch.js'
import useDebounce from '../../hooks/useDebounce.js'
import Loader from '../misc/Loader.jsx'

const Search = ({ handleShowModal }) => {
  const { query, setQuery } = useContext(SearchContext)
  const {
    data: { data: { data } = {} } = {},
    isLoading,
    isError,
    error,
  } = useSearch(query)

  const changeQuery = (e) => {
    setQuery(e.target.value)
  }

  const handleClose = () => {
    handleShowModal(false)
    setQuery('')
  }

  const debouncedChangeQuery = useDebounce(changeQuery, 300)

  let searchResult = null

  if (isLoading && !isError) {
    searchResult = (
      <div>
        <Loader />
      </div>
    )
  }
  if (!isLoading && isError) {
    searchResult = (
      <div>
        <p>{error.response.data.message}</p>
      </div>
    )
  }
  if (!isLoading && !isError && data?.length === 0) {
    searchResult = (
      <div>
        <p>{error}</p>
      </div>
    )
  }
  if (!isLoading && !isError && data?.length > 0) {
    searchResult = data.map(({ id, thumbnail, title, content }) => (
      <Link
        onClick={() => handleShowModal(false)}
        to={`/blog/${id}`}
        key={id}
        className='flex gap-6 py-2'
      >
        <img
          className='h-28 object-contain'
          src={`${BASE_URL}/uploads/blog/${thumbnail}`}
          alt='thumbnail'
        />
        <div className='mt-2'>
          <h3 className='text-slate-300 text-xl font-bold'>{title}</h3>
          <p className='mb-6 text-sm text-slate-500 mt-1'>
            {`${content.slice(0, 200)}...`}
          </p>
        </div>
      </Link>
    ))
  }

  return (
    <div>
      <section className='absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50'>
        {/* Search Container */}
        <div className='relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10'>
          {/* Search */}
          <div>
            <h3 className='font-bold text-xl pl-2 text-slate-400 my-2'>
              Search for Your Desire Blogs
            </h3>
            <input
              defaultValue={query || ''}
              autoFocus
              onChange={debouncedChangeQuery}
              type='text'
              placeholder='Start Typing to Search'
              className='w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600'
            />
          </div>
          {/* Search Result */}
          <div>
            <h3 className='text-slate-400 font-bold mt-6'>Search Results</h3>
            <div className='my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain'>
              {searchResult}
            </div>
          </div>
          <div onClick={handleClose}>
            <img
              src={CloseIcon}
              alt='Close'
              className='absolute right-2 top-2 cursor-pointer w-8 h-8'
            />
          </div>
        </div>
      </section>
    </div>
  )
}
export default Search
