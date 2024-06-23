'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillProduct } from 'react-icons/ai'
import { IoMdPricetag } from 'react-icons/io'

const LinkButtons = ({
  lang,
  priceChartLocale,
  productListLocale,
}: {
  lang: ILang['lang']
  priceChartLocale: string
  productListLocale: string
}) => {
  const pathname = usePathname()

  const isProductListPath = pathname.includes('/productList')
  const isPriceChartPath = pathname.includes('/priceChart')

  return (
    <div className='flex gap-2 mt-6'>
      <p className='italic text-orange-500 mt-2'>
        {lang === 'bn' ? 'লিংকসমূহ' : 'Links'}{' '}
      </p>
      <Button
        className={`rounded-full mb-6 text-white ${
          isPriceChartPath
            ? 'bg-orange-600 hover:bg-orange-600 -translate-y-1'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        variant={'link'}
      >
        <IoMdPricetag className='mr-2' />
        <Link href={`/${lang}/admin-dashboard/priceChart`}>
          {priceChartLocale}
        </Link>
      </Button>
      <Button
        className={`bg-blue-500 hover:bg-blue-600 rounded-full mb-6 text-white ${
          isProductListPath
            ? 'bg-orange-600 hover:bg-orange-600 -translate-y-1'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        variant={'link'}
      >
        <AiFillProduct className='mr-2' />
        <Link href={`/${lang}/admin-dashboard/productList`}>
          {productListLocale}
        </Link>
      </Button>
    </div>
  )
}
export default LinkButtons
