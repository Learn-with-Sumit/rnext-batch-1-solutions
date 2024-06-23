'use client'

import useFilterContext from '@/hooks/context-hooks/useFilterContext'
import { SIZES } from '@/utils/constants'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect } from 'react'
import { Button } from '../ui/button'
import { DrawerClose, DrawerContent, DrawerFooter } from '../ui/drawer'

const DrawerContents = ({ categories }: { categories: string[] }) => {
  // I tried but there is some unknown error which i dont understand why happening, I wrapped the filter provider on top of the page and it says,
  // TypeError: setSelectedCategories is not a function
  const {
    maxPrice,
    minPrice,
    selectedSize,
    setColor,
    setMaxPrice,
    setMinPrice,
    setSelectedSize,
    selectedCategories,
    setSelectedCategories,
  } = useFilterContext()

  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const params = new URLSearchParams(searchParams)

  const handleChangeCategory = (category: string) => {
    const updatedCategories = [...selectedCategories]
    const categoryIndex = updatedCategories.indexOf(category)

    if (categoryIndex !== -1) {
      updatedCategories.splice(categoryIndex, 1)
    } else {
      updatedCategories.push(category)
    }

    setSelectedCategories(updatedCategories)

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
    replace(pathname)
  }

  useEffect(() => {
    const minParam = searchParams.get('min')
    const maxParam = searchParams.get('max')
    const sizeParam = searchParams.get('size')
    const categoryParam = searchParams.getAll('category')
    const colorParam = searchParams.get('color')

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
  }, [searchParams])

  return (
    <DrawerContent className='px-6'>
      <h5
        id='drawer-label'
        className='inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400'
      >
        <svg
          className='w-5 h-5 mr-2'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
            clipRule='evenodd'
          />
        </svg>
        Info
      </h5>
      <button
        type='button'
        data-drawer-hide='drawer-example'
        aria-controls='drawer-example'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
      >
        <svg
          aria-hidden='true'
          className='w-5 h-5'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
        <span className='sr-only'>Close menu</span>
      </button>
      <div className='divide-y divide-gray-200 space-y-5'>
        <div>
          <h3 className='text-xl text-gray-800 mb-3 uppercase font-medium'>
            Categories
          </h3>
          <div className='space-y-2'>
            {categories.map((categoryName) => (
              <div className='flex items-center' key={categoryName}>
                <input
                  type='checkbox'
                  id={categoryName}
                  checked={selectedCategories?.includes(categoryName)}
                  onChange={() => handleChangeCategory(categoryName)}
                  className='text-primary focus:ring-0 rounded-sm cursor-pointer'
                />
                <label
                  htmlFor={categoryName}
                  className='text-gray-600 ml-3 cursor-pointer'
                >
                  {categoryName}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='pt-4'>
          <h3 className='text-xl text-gray-800 mb-3 uppercase font-medium'>
            Price
          </h3>
          <div className='mt-4 flex items-center'>
            <input
              type='text'
              name='min'
              id='min'
              value={minPrice}
              onChange={handleSetMinPrice}
              className='w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm'
              placeholder='min'
            />
            <span className='mx-3 text-gray-500'>-</span>
            <input
              type='text'
              name='max'
              id='max'
              value={maxPrice}
              onChange={handleSetMaxPrice}
              className='w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm'
              placeholder='max'
            />
          </div>
        </div>
        <div className='pt-4'>
          <h3 className='text-xl text-gray-800 mb-3 uppercase font-medium'>
            Size
          </h3>
          <div className='flex items-center gap-2'>
            {SIZES.map((size) => (
              <div className='size-selector' key={size}>
                <input
                  type='radio'
                  name='size'
                  id={`size-${size.toLowerCase()}`}
                  className='hidden'
                  onChange={() => handleSelectSize(size)}
                  onClick={() => handleSelectSize(size)}
                  checked={selectedSize === size}
                />
                <label
                  htmlFor={`size-${size.toLowerCase()}`}
                  className={`text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600 ${
                    selectedSize === size ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose>
          <Button variant='outline' onClick={handleReset}>
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  )
}

export default DrawerContents
