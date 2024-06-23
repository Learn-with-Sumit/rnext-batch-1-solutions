'use client'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { convertToBengali } from '@/utils/convertNumsToBengali'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

const ShopPagination = ({ productCount }: { productCount: number }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isLocaleBangla = pathname.includes('/bn')

  const totalItems = productCount
  const itemsPerPage = Number(searchParams.get('limit')) || 10
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // memoizing the page for improving performance
  const currentPage = useMemo(() => {
    const skip = searchParams.get('skip')
    return skip ? Math.floor(parseInt(skip) / itemsPerPage) + 1 : 1
  }, [searchParams, itemsPerPage])

  const handlePagination = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('skip', (page - 1) * itemsPerPage + '')
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const PaginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <Pagination className='mb-12 dark:text-white'>
      <PaginationContent className='*:cursor-pointer'>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              text={isLocaleBangla ? 'পূর্ববর্তী' : 'Previous'}
              onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>
        )}

        {PaginationButtons.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handlePagination(page)}
            >
              {isLocaleBangla ? convertToBengali(page) : page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              text={isLocaleBangla ? 'পরবর্তী' : 'Next'}
              onClick={() =>
                handlePagination(Math.min(currentPage + 1, totalPages))
              }
            />
          </PaginationItem>
        )}
        {productCount <= 10 && (
          <p className='ml-2'>
            {isLocaleBangla ? 'আর পণ্য নেই' : 'No more products'}
          </p>
        )}
      </PaginationContent>
    </Pagination>
  )
}
export default ShopPagination
