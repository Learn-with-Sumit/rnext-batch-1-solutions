import { useMenuAnimation } from '@/hooks/misc-hooks/useMenuAnimation'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

const useSearchSuggestion = () => {
  const queryClient = useQueryClient()
  const [value, setValue] = useState('')
  const [limit, setLimit] = useState(10)
  const menuRef = useRef<HTMLUListElement>(null)
  const scope = useMenuAnimation(!!value)
  const infiniteScrollRef = useRef(null)
  const [hasMore, setHasMore] = useState(true)

  // get the totalProducts data related to the query so we can tell when has more has to be false
  const { data: { products: totalProducts } = {} } = ({} = useQuery({
    queryKey: ['totalProducts', value],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/count/${value}`
      )
      return data
    },
    enabled: !!value,
  }))

  // get limited data first
  const { data, isLoading, isError } = useQuery({
    queryKey: ['query', value],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${value}?limit=${limit}`
      )
      return data
    },
    enabled: !!value,
  })

  // intersection logic
  useEffect(() => {
    // make hasMore true or false based on condition
    if (totalProducts && data?.products?.length === totalProducts) {
      setHasMore(false)
    }
    if (totalProducts && data?.products?.length < totalProducts) {
      setHasMore(true)
    }

    // load more on intersection
    const onIntersection = (items: any) =>
      items[0].isIntersecting &&
      hasMore &&
      // increase the limit on intersect
      setLimit((prevLimit) => prevLimit + 10)

    const observer = new IntersectionObserver(onIntersection)
    // observe the ref
    observer &&
      infiniteScrollRef.current &&
      observer.observe(infiniteScrollRef.current)

    // cleanup
    return () => observer && observer.disconnect()
  }, [hasMore, data?.products?.length, value, queryClient, totalProducts])

  // this effect checks if limit has changed and revalidates the data to add new data
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['query', value] })
  }, [queryClient, limit, value])

  const containerRef = useRef<HTMLDivElement>(null)

  // if clicked outside, close the search suggestion
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setValue])

  return {
    isLoading,
    isError,
    data,
    setValue,
    scope,
    menuRef,
    hasMore,
    infiniteScrollRef,
    containerRef,
    value,
    totalProducts,
  }
}
export default useSearchSuggestion
