import { useState } from 'react'
import { SearchContext } from '../context/index.js'
import usePortal from '../hooks/usePortal.js'

const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState(null)

  const { showModal, handleShowModal } = usePortal()

  return (
    <SearchContext.Provider
      value={{ query, setQuery, showModal, handleShowModal }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
