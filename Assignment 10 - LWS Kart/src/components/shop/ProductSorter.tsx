'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiFillProduct } from 'react-icons/ai'
import { HiMiniArrowTrendingUp } from 'react-icons/hi2'
import { MdFiberNew } from 'react-icons/md'
import { TbStairsDown, TbStairsUp } from 'react-icons/tb'

const ProductSorter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [sortOption, setSortOption] = useState('')
  const { lang } = useParams()

  const isLocaleBengali = lang === 'bn'

  useEffect(() => {
    const sort = searchParams.get('sort')
    if (sort) {
      setSortOption(sort)
    } else {
      setSortOption('')
    }
  }, [searchParams])

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (value === 'default') {
      setSortOption('')
      const params = new URLSearchParams(searchParams)
      params.delete('sort')
      router.push(`${pathname}?${params.toString()}`)
    } else {
      setSortOption(value)
      newParams.set('sort', value)
      router.push(`${pathname}?${newParams.toString()}`)
    }
  }

  return (
    <Select value={sortOption} onValueChange={handleSortChange}>
      <SelectTrigger className='w-[300px] text-xs dark:bg-black'>
        <SelectValue
          placeholder={isLocaleBengali ? 'দ্বারা সাজানো' : 'Sort By'}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>
            {isLocaleBengali ? 'ক্রমানুযায়ী সাজানো' : 'Sort Options'}
          </SelectLabel>
          <SelectItem className='pl-4' value='default'>
            <div className='flex gap-2 items-center'>
              <AiFillProduct />
              {isLocaleBengali ? 'ডিফল্ট' : 'Default'}
            </div>
          </SelectItem>
          <SelectItem className='pl-4' value='price(high)'>
            <div className='flex gap-2 items-center'>
              <TbStairsDown />
              {isLocaleBengali ? 'দাম: উচ্চ থেকে নিম্ন' : 'Price: High to Low'}
            </div>
          </SelectItem>
          <SelectItem className='pl-4' value='price(low)'>
            <div className='flex gap-2 items-center'>
              <TbStairsUp />
              {isLocaleBengali ? 'দাম: নিম্ন থেকে উচ্চ' : 'Price: Low to High'}
            </div>
          </SelectItem>
          <SelectItem className='pl-4' value='trending'>
            <div className='flex gap-2 items-center'>
              <HiMiniArrowTrendingUp />
              {isLocaleBengali ? 'ট্রেন্ডিং' : 'Trending'}
            </div>
          </SelectItem>
          <SelectItem className='pl-4' value='new_arrival'>
            <div className='flex gap-2 items-center'>
              <MdFiberNew />
              {isLocaleBengali ? 'নতুন আগমন' : 'New Arrivals'}
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default ProductSorter
