'use client'
import useSearch from '@/hooks/product-hooks/useSearch'
import useSearchSuggestion from '@/hooks/product-hooks/useSearchSuggestion'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { Input } from '../ui/input'
import SpotlightButton from '../ui/spotlight-btn'
import SearchSuggestionItem from './SearchSuggestionItem'
import TypeEffect from './TypeAnimation'

const Search = ({ searchLocale }: { searchLocale: string }) => {
  const [searchIsFocused, setSearchIsFocused] = useState(false)
  const { query, handleSearch, setQuery } = useSearch()
  const {
    isLoading,
    isError,
    data,
    setValue,
    scope,
    menuRef,
    hasMore,
    infiniteScrollRef,
    value,
    containerRef,
    totalProducts,
  } = useSearchSuggestion()

  let content = null

  const pathname = usePathname()

  // on admin page, don't show the search bar
  const pathnameIncludesAdminDashboard = pathname.includes('admin-dashboard')

  // stop the type effect on product details page
  const onProductDetailsPage = pathname.includes('product-details')

  if (isLoading && !isError) {
    content = (
      <div className='flex flex-col gap-4 p-2'>
        {Array.from({ length: 10 }).map((_, i) => (
          <li
            className='p-2 animate-pulse shadow-lg h-24 rounded-md border border-black'
            key={i}
          >
            <Loader2 className='animate-spin m-auto mt-6' />
          </li>
        ))}
      </div>
    )
  }

  const productsLength = data?.products?.length

  if (!isLoading && isError) {
    content = (
      <p className='text-red-500 italic text-xs'>Something went wrong</p>
    )
  }

  if (!isLoading && !isError && productsLength === 0) {
    content = (
      <p className='text-blue-500 italic text-xs'>
        No Products Found for your query {'->'} {value}
      </p>
    )
  }

  if (!isLoading && !isError && productsLength > 0) {
    content = data?.products?.map((product: IProduct) => (
      <li
        className='dark:bg-slate-700 rounded-md shadow-lg hover:-translate-y-1 duration-300 transition-all'
        onClick={() => setValue('')}
        key={product._id}
      >
        <SearchSuggestionItem product={product} />
      </li>
    ))
  }

  // handle click on type effect to focus input
  const inputRef = useRef<HTMLInputElement | null>(null)
  const handleTypeEffectClick = () => {
    setSearchIsFocused(true)
    inputRef.current && inputRef.current.focus()
  }

  return (
    <div
      className={`w-full max-w-xl justify-center ml-24  ${
        pathnameIncludesAdminDashboard ? 'hidden' : 'flex'
      }`}
      ref={containerRef}
    >
      <div className='flex w-full relative max-w-sm items-center space-x-2'>
        <HiMagnifyingGlass className='absolute left-5' />
        <Input
          ref={inputRef}
          onBlur={(e) => !query && !e.target.value && setSearchIsFocused(false)}
          onFocus={() => setSearchIsFocused(true)}
          onKeyDown={(e) => e.key === 'Enter' && query && handleSearch(query)}
          value={query}
          onChange={(e) => {
            const value = e.target.value
            setValue(value)
            setQuery(value)
          }}
          type='search'
          className='placeholder:relative placeholder:left-2 pl-8 w-96'
        />
        <div onClick={handleTypeEffectClick} className='absolute left-12'>
          {!searchIsFocused && !onProductDetailsPage && <TypeEffect />}
        </div>
        {/* search button */}
        <SpotlightButton
          searchLocale={searchLocale}
          disabled={!query}
          onClick={() => {
            if (query) {
              handleSearch(query)
              setValue('')
            }
          }}
        />

        <div ref={scope} className='shadow-lg relative'>
          <motion.ul
            ref={menuRef}
            className={`absolute ${
              !!value ? 'block' : 'hidden'
            } bg-white shadow-md w-96 h-96 absolute right-6 top-12 rounded-md z-50 space-y-4 overflow-y-auto p-2 dark:bg-slate-800`}
          >
            <p className='text-orange-500 italic text-xs flex gap-1'>
              Search results for : {value} (
              {isLoading ? (
                <span className='inline'>
                  <Loader2 className='animate-spin text-xs size-4' />
                </span>
              ) : (
                <span>{totalProducts}</span>
              )}{' '}
              results)
            </p>
            {content}
            {hasMore && (
              <li ref={infiniteScrollRef}>
                <Loader2
                  className={`animate-spin m-auto ${
                    productsLength > 0 ? 'block' : 'hidden'
                  }`}
                />
              </li>
            )}
            <li className='hidden' />
          </motion.ul>
        </div>
      </div>
      {/* add a full screen overlay when search has value*/}
      {!!value &&
        createPortal(
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'></div>,
          document.body
        )}
    </div>
  )
}

export default Search
