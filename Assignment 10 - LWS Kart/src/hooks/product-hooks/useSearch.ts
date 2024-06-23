import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
const useSearch = () => {
  const [query, setQuery] = useState('')
  const { lang } = useParams()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set('query', query)
    } else {
      params.delete('query')
    }
    // move to shop page on search
    replace(`/${lang}/shop?${params.toString()}`)
    setQuery('')
  }
  // on page reload, set the value from search params if there are any
  useEffect(() => {
    const queryParam = searchParams.get('query')
    if (queryParam) {
      setQuery(queryParam)
    }
  }, [searchParams])
  return { query, handleSearch, setQuery }
}
export default useSearch
