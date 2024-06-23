'use client'
import { useSearchParams } from 'next/navigation'

const NoProductMessage = () => {
  const searchParams = useSearchParams()

  let searchParamString = ''

  for (const [key, value] of searchParams.entries()) {
    searchParamString += `[${key} : ${value}]`
  }
  return (
    <p className='text-sm text-gray-600 dark:text-gray-200'>
      No products for your
      <span className='text-red-500 italic'>{searchParamString}</span>
    </p>
  )
}
export default NoProductMessage
