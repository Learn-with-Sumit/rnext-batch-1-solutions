import { useState } from 'react'
import { SearchContext } from '../context/index.js'

const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('')
  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
export default SearchProvider
