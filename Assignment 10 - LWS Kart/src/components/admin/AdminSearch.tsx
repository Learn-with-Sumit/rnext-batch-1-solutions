'use client'
import useDebounce from '@/hooks/misc-hooks/useDebounce'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { CgSearch } from 'react-icons/cg'

const AdminSearch = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { lang } = useParams()
  const { replace } = useRouter()

  // add a query string in search param as user types
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
      // delete the limit, if user is searching
      params.delete('limit')
    } else {
      params.delete('query')
    }
    // changes the search params
    replace(`${pathname}?${params.toString()}`)
  }

  // debounce the search
  const debouncedSearch = useDebounce((e) => {
    handleSearch(e.target.value)
  }, 300)

  return (
    <div className='flex gap-2 items-center'>
      <input
        onChange={debouncedSearch}
        className='bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-blue-400 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full text-sm  px-4 py-1 shadow-md focus:shadow-lg focus:shadow-blue-400'
        id='inline-full-name'
        type='search'
        placeholder={lang === 'en' ? 'Search a Product' : 'পন্য খোজ করুন'}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <label
        className='block text-gray-500 font-bold md:text-right md:mb-0 text-xl'
        htmlFor='inline-full-name'
      >
        <CgSearch />
      </label>
    </div>
  )
}
export default AdminSearch
