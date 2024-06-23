import { FilterContext } from '@/context'
import { useContext } from 'react'

const useFilterContext = (): IFilterContext => {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider')
  }
  return context
}

export default useFilterContext
