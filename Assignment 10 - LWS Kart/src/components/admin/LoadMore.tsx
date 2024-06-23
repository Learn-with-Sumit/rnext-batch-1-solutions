'use client'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import AllLoaded from './AllLoaded'

const LoadMore = ({ limit, count }: { limit: number; count: number }) => {
  const loaderRef = useRef<HTMLDivElement>(null)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const increaseLimit = useCallback(
    (limit: string) => {
      const params = new URLSearchParams(searchParams)
      // increase the current limit with 10
      params.set('limit', (Number(limit) + 10).toString())

      // replace the URL without affecting scroll position
      replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [pathname, replace, searchParams]
  )

  // intersection logic (:
  useEffect(() => {
    const onIntersection = (items: any) =>
      items[0].isIntersecting && increaseLimit(limit.toString())

    const observer = new IntersectionObserver(onIntersection)

    observer && loaderRef.current && observer.observe(loaderRef.current)

    return () => observer && observer.disconnect()
  }, [increaseLimit, limit])

  // stop the limit increase when it reaches the total products count

  return limit <= count ? (
    <div ref={loaderRef} className='mt-12 p-4'>
      <Loader2 className='text-xl m-auto text-center animate-spin' />
    </div>
  ) : (
    <AllLoaded />
  )
}
export default LoadMore
