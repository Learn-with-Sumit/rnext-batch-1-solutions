import Link from 'next/link'
import { FaShop } from 'react-icons/fa6'

const NoWishlist = ({ lang }: { lang: ILang['lang'] }) => {
  const isLocaleBengali = lang === 'bn'

  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='container flex items-center min-h-[50vh] px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <p className='p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          </p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
            {isLocaleBengali
              ? 'আপনার কোনও উইশলিস্ট আইটেম নেই'
              : 'You have no wishlisted items'}
          </h1>
          <p className='mt-4 text-gray-500 dark:text-gray-400'>
            {isLocaleBengali
              ? 'উইশলিস্টে কিছু যোগ করতে আপনি দোকানে যেতে পারেন'
              : 'You can go to the shop to add something to the wishlist'}
          </p>
          <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
            <button className='w-1/2 px-5 py-2 text-sm tracking-wide flex gap-2 items-center text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'>
              <Link href='/shop'>
                {isLocaleBengali ? 'আমাকে দোকানে নিয়ে যান' : 'Take me to shop'}
              </Link>
              <FaShop />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NoWishlist
