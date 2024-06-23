import { getDictionary } from '@/app/[lang]/dictionaries'
import { convertToBengali } from '@/utils/convertNumsToBengali'
import React from 'react'
import { Button } from '../ui/movingBorder'

export async function ProductCount({
  products,
  lang,
}: {
  products: IProduct[]
  lang: ILang['lang']
}) {
  const { productsFoundText } = await getDictionary(lang)

  return (
    <div className='flex justify-center -p-1'>
      <Button
        borderRadius='2.75rem'
        className='bg-gray-200 cursor-default shadow-md dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 flex justify-center items-center'
      >
        <p className='text-blue-500 italic text-center w-full'>
          {lang === 'bn' ? convertToBengali(products.length) : products.length}
          {productsFoundText}
        </p>
      </Button>
    </div>
  )
}
