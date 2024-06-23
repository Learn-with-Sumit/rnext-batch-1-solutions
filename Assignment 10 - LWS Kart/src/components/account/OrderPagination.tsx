'use client'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import usePagination from '@/hooks/product-hooks/usePagination'

export function OrderPagination({ orders }: any) {
  const {
    paginationButtons,
    handlePagination,
    totalPages,
    isLocaleBangla,
    currentPage,
  } = usePagination(orders)

  return (
    <Pagination className='dark:text-white'>
      <PaginationContent className='*:cursor-pointer'>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              text={isLocaleBangla ? 'পূর্ববর্তী' : 'Previous'}
              onClick={() => handlePagination(Math.max(currentPage - 1, 1))}
            />
          </PaginationItem>
        )}

        {paginationButtons.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => handlePagination(page)}
            >
              {page}
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
        {orders.length <= 10 && orders.length > 0 && (
          <p className='ml-2'>
            {isLocaleBangla ? 'আর অর্ডার নেই' : 'No more orders'}
          </p>
        )}
      </PaginationContent>
    </Pagination>
  )
}
