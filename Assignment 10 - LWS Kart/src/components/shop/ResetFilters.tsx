'use client'
import useSidebarFilter from '@/hooks/product-hooks/useSidebarFilter'
import { useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'

const ResetFilters = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())

  const { handleReset } = useSidebarFilter()

  return (
    <Button
      onClick={handleReset}
      className={`mt-2 ${
        params.size > 0 ? 'visible' : 'invisible'
      } dark:text-white`}
      variant={'outline'}
    >
      Reset
    </Button>
  )
}
export default ResetFilters
