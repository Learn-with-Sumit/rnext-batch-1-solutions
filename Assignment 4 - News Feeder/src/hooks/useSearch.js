import { useContext, useEffect, useRef, useState } from 'react'
import useDebounce from './useDebounce.js'
import { SearchContext } from '../context/index.js'

const useSearch = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false)
  const { searchValue, setSearchValue } = useContext(SearchContext)
  const inputRef = useRef(null)

  // toggle search input
  const toggleSearch = () => {
    setSearchIsOpen((prevOpen) => !prevOpen)
  }

  // when user clicks outside the search or the search button, it will close
  const handleOutsideClick = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSearchIsOpen(false)
    }
  }

  useEffect(() => {
    if (searchIsOpen) {
      document.addEventListener('click', handleOutsideClick)
    } else {
      document.removeEventListener('click', handleOutsideClick)
    }

    return () => document.removeEventListener('click', handleOutsideClick)
  }, [searchIsOpen])

  const handleChange = (e) => {
    const value = e.target.value
    searchNews(value)
  }
  // debounced search
  const searchNews = useDebounce((value) => {
    setSearchValue(value)
  }, 500)

  return {
    searchValue,
    toggleSearch,
    inputRef,
    searchIsOpen,
    handleChange,
    searchNews,
  }
}
export default useSearch
