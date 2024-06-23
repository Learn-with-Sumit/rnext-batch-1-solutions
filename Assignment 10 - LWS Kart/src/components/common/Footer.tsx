import { getDictionary } from '@/app/[lang]/dictionaries'
import Image from 'next/image'
import LWSLogo from '../../../public/lws-logo.png'

const Footer = async ({ lang }: ILang) => {
  const {
    footer: {
      message,
      sections: {
        solutions: { title: solutionsTitle, items: solutionsItems },
        support: { title: supportTitle, items: supportItems },
      },
      copyright,
    },
  } = await getDictionary(lang)

  return (
    <footer className='bg-white pt-16 pb-12 border-t border-gray-100 dark:bg-slate-800 dark:border-gray-700'>
      <div className='container grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='space-y-4'>
          <div className='flex gap-2 items-center'>
            <Image
              src={LWSLogo}
              width={1200}
              height={1200}
              alt='Logo'
              className='w-10'
              placeholder='blur'
            />
            <div className='flex gap-1 dark:text-white'>
              <p className='font-bold'>LWS</p>
              <p>Kart</p>
            </div>
          </div>
          <p className='text-gray-500 dark:text-gray-300'>{message}</p>
          <div className='flex space-x-5'>
            {['facebook', 'instagram', 'twitter', 'github'].map(
              (social, index) => (
                <a
                  key={index}
                  href='#'
                  className='text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-white'
                >
                  <i className={`fa-brands fa-${social}-square`} />
                </a>
              )
            )}
          </div>
        </div>
        <div className='md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8'>
          <div>
            <h3 className='text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider'>
              {solutionsTitle}
            </h3>
            <div className='mt-4 space-y-4'>
              {solutionsItems.map((item, index) => (
                <a
                  key={index}
                  href='#'
                  className='text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block'
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className='text-sm font-semibold text-gray-400 dark:text-gray-300 uppercase tracking-wider'>
              {supportTitle}
            </h3>
            <div className='mt-4 space-y-4'>
              {supportItems.map((item, index) => (
                <a
                  key={index}
                  href='#'
                  className='text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block'
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='text-center mt-8 text-gray-500 dark:text-gray-300'>
        {copyright}
      </div>
    </footer>
  )
}

export default Footer
