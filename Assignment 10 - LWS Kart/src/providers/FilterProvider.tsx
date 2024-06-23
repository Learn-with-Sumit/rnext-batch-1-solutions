'use client'
import { FilterContext } from '@/context'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

const FilterProvider = ({ children }: WrapperChild) => {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [color, setColor] = useState('Color')
  const [stockStatus, setStockStatus] = useState<boolean>(true)
  const searchParams = useSearchParams()
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.getAll('category')
  )

  return (
    <FilterContext.Provider
      value={{
        minPrice,
        maxPrice,
        selectedSize,
        color,
        setColor,
        setMinPrice,
        setMaxPrice,
        setSelectedSize,
        selectedCategories,
        setSelectedCategories,
        stockStatus,
        setStockStatus,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
export default FilterProvider
