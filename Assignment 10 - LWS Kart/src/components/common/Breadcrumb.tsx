'use client'

import { BreadCrumbTranslations } from '@/utils/constants'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { FaChevronRight } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'

var mongoIDRegex = /^[0-9a-fA-F]{24}$/

type PathKeys = 'shop' | 'productDetails' | 'account' | 'checkout'

const checkValidMongoId = (str: string) => {
  return mongoIDRegex.test(str)
}

const Breadcrumb = ({ product }: { product?: IProduct }) => {
  const pathname = usePathname()
  const splittedPathname = pathname
    ?.split('/')
    .filter((path) => ['en', 'bn'].indexOf(path) < 0) // omit en bn here
  const { lang } = useParams()

  const isLocaleBengali = lang === 'bn'
  const t = isLocaleBengali
    ? BreadCrumbTranslations.bn
    : BreadCrumbTranslations.en

  return (
    <div className='container py-4 flex items-center gap-3 dark:text-white dark:bg-slate-800 mb-4'>
      <Link href='/' className='text-primary text-base'>
        <FaHouse />
      </Link>

      {splittedPathname.map((path, index) => {
        const translatedPath = t[path as PathKeys] || path
        return (
          <div className='flex gap-2 items-center capitalize ' key={path}>
            <div
              className={`${
                index === splittedPathname.length - 1
                  ? 'text-blue-500'
                  : 'text-gray-600'
              } font-medium`}
            >
              {checkValidMongoId(path)
                ? (product?.product_name as string)
                : translatedPath}
            </div>
            {index < splittedPathname.length - 1 && (
              <span className='text-sm text-gray-400'>
                <FaChevronRight />
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default Breadcrumb
