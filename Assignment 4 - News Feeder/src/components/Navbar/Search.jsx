import useSearch from '../../hooks/useSearch.js'
import SearchIcon from '../../assets/icons/search.svg'
import { useContext } from 'react'
import { NewsContext } from '../../context/index.js'

const Search = () => {
  const { toggleSearch, searchIsOpen, handleChange, inputRef } = useSearch()
  const { error } = useContext(NewsContext)
  return (
    <div className='flex items-center space-x-3 lg:space-x-8' ref={inputRef}>
      {searchIsOpen && (
        <input
          disabled={error}
          onChange={handleChange}
          autoFocus
          placeholder={error ? 'No data...' : 'Search For Any News'}
          className='border border-black rounded-lg p-1'
          type='search'
        />
      )}
      <img
        onClick={toggleSearch}
        className='cursor-pointer shadow-md p-2 rounded-full'
        src={SearchIcon}
      />
    </div>
  )
}
export default Search
