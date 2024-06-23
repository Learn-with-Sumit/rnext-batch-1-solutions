import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect } from 'react'
import useFilterContext from '../context-hooks/useFilterContext'

const useSidebarFilter = () => {
  const {
    color,
    maxPrice,
    minPrice,
    selectedSize,
    setColor,
    setMaxPrice,
    setMinPrice,
    setSelectedSize,
    selectedCategories,
    setSelectedCategories,
    stockStatus,
    setStockStatus,
  } = useFilterContext()
  const searchParams = useSearchParams()

  const { replace } = useRouter()
  const pathname = usePathname()

  const params = new URLSearchParams(searchParams)

  const handleSetStockStatus = (value: string) => {
    setStockStatus(value === 'inStock')

    if (value) {
      params.set('stock_status', value)
    } else {
      params.delete('stock_status')
    }
    replace(`${pathname}?${params.toString()}`)
  }

  const handleChangeCategory = (category: string) => {
    const updatedCategories = [...selectedCategories]
    const categoryIndex = updatedCategories.indexOf(category)

    if (categoryIndex !== -1) {
      updatedCategories.splice(categoryIndex, 1)
    } else {
      updatedCategories.push(category)
    }

    setSelectedCategories(updatedCategories)

    const params = new URLSearchParams(searchParams)

    if (updatedCategories.length > 0) {
      params.set('category', updatedCategories.join(','))
    } else {
      params.delete('category')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleSetMinPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setMinPrice(value)
    params.set('min', value)
    if (value) {
      params.set('min', value)
    } else {
      params.delete('min')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  const handleSetMaxPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPrice(value)
    if (value) {
      params.set('max', value)
    } else {
      params.delete('max')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleSelectSize = (size: string) => {
    const existingSize = searchParams.get('size')

    if (size === existingSize) {
      setSelectedSize('')
      params.delete('size')
    } else {
      setSelectedSize(size)
      params.set('size', size)
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleSelectColor = (value: string) => {
    setColor(value)
    if (value) {
      params.set('color', value)
    } else {
      params.delete('color')
    }

    replace(`${pathname}?${params.toString()}`)
  }

  const handleReset = () => {
    setMaxPrice('')
    setMinPrice('')
    setColor('Color')
    setSelectedSize('')
    setSelectedCategories([])
    setStockStatus(true)
    replace(pathname)
  }

  // on page reload, set the value from search params if there are any
  useEffect(() => {
    const minParam = searchParams.get('min')
    const maxParam = searchParams.get('max')
    const sizeParam = searchParams.get('size')
    const categoryParam = searchParams.getAll('category')
    const colorParam = searchParams.get('color')
    const stockStatusParam = searchParams.get('stock_status')

    if (minParam) {
      setMinPrice(minParam)
    }
    if (maxParam) {
      setMaxPrice(maxParam)
    }
    if (sizeParam) {
      setSelectedSize(sizeParam)
    }
    if (categoryParam.length > 0) {
      setSelectedCategories(categoryParam[0].split(','))
    }
    if (colorParam) {
      setColor(colorParam)
    }
    if (stockStatusParam) {
      setStockStatus(stockStatusParam === 'inStock')
    }
  }, [searchParams])

  return {
    minPrice,
    handleSetMinPrice,
    handleSetMaxPrice,
    handleSelectSize,
    selectedSize,
    maxPrice,
    handleChangeCategory,
    selectedCategories,
    handleSelectColor,
    color,
    setSelectedCategories,
    handleReset,
    handleSetStockStatus,
    stockStatus,
  }
}
export default useSidebarFilter
