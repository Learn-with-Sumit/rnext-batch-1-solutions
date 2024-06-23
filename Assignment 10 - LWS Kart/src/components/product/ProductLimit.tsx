'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { convertToBengali } from '@/utils/convertNumsToBengali'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ProductLimit = ({ length }: { length: number }) => {
  const limitOptions = Array.from({ length: length / 10 }, (_, i) => i + 1)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isLocaleBangla = pathname.includes('/bn')

  const defaultValue = searchParams.get('limit')?.toString() || String(10)

  const handleSelectChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('limit', value)
    router.push(`${pathname}?${newParams.toString()}`)
    router.refresh()
  }

  return (
    <div className='flex gap-2 items-center'>
      <p className='dark:text-white'>{isLocaleBangla ? 'দেখান' : 'Show'}: </p>
      <Select onValueChange={handleSelectChange} value={defaultValue}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Show' />
        </SelectTrigger>
        <SelectContent>
          {limitOptions.map((option) => (
            <SelectItem key={option} value={(option * 10).toString()}>
              {isLocaleBangla ? convertToBengali(option * 10) : option * 10}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default ProductLimit
