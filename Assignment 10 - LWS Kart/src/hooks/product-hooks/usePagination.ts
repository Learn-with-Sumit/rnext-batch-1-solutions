import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const usePagination = (orders: any) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const totalItems = orders.length
  const itemsPerPage = 10
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // memoizing the page for improving performance
  const currentPage = useMemo(() => {
    const skip = searchParams.get('skip')
    return skip ? Math.floor(parseInt(skip) / itemsPerPage) + 1 : 1
  }, [searchParams])
  const isLocaleBangla = pathname.includes('/bn')

  const handlePagination = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    // when order enabled, set order true as search param
    newParams.set('order', 'true')
    newParams.set('skip', (page - 1) * itemsPerPage + '')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1)

  return {
    paginationButtons,
    handlePagination,
    totalItems,
    totalPages,
    itemsPerPage,
    searchParams,
    currentPage,
    isLocaleBangla,
  }
}
export default usePagination
