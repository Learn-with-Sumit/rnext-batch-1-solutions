import Link from 'next/link'
import { MdHome } from 'react-icons/md'

export default function NotFoundPageAdmin() {
  return (
    <div className='flex items-center justify-center min-h-[60vh] bg-gray-100'>
      <div className='bg-white p-8 rounded-md shadow-md text-center'>
        <h2 className='text-4xl font-bold text-red-500 mb-4'>
          Sorry, this page is only available for admin
        </h2>
        <p className='text-lg text-gray-700 mb-8'>Take me to the home page</p>
        <Link
          href='/'
          className='bg-blue-500 py-2 px-6 hover:bg-blue-400 hover:-translate-y-1 transition-all duration-300 rounded-full text-md flex justify-center items-center w-fit m-auto text-white'
        >
          <MdHome />
          <p>Home</p>
        </Link>
      </div>
    </div>
  )
}
