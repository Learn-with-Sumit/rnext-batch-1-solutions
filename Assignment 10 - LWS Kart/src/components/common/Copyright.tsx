import { getDictionary } from '@/app/[lang]/dictionaries'
import Image from 'next/image'

const Copyright = async ({ lang }: ILang) => {
  const {
    footer: { copyright },
  } = await getDictionary(lang)

  return (
    <div className='bg-gray-800 py-4'>
      <div className='container flex items-center justify-between'>
        <p className='text-white'>{copyright}</p>
        <div>
          <Image
            width={200}
            height={200}
            src='/images/methods.png'
            alt='methods'
            className='h-5'
          />
        </div>
      </div>
    </div>
  )
}
export default Copyright
