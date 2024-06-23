import { UserModel } from '@/app/models/userModel'
import connectMongo from '@/db/connectMongo'
import moment from 'moment-timezone'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const BannedPage = async ({
  params: { userId },
}: {
  params: { userId: string }
}) => {
  await connectMongo()
  const user = await UserModel.findById(userId)

  // if expires is null, show not found page, it does not make sense to show banned page in this case
  if (!user?.jail?.expires) {
    notFound()
  }

  // get the expired date end time
  const expireDateEnd = moment(user?.jail?.expires)
    .tz('Asia/Dhaka')
    .format('MMMM Do YYYY, h:mm:ss a')

  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-[50vh]'>
      <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center'>
        <div className='flex justify-center mb-4'>
          <svg
            className='w-16 h-16 text-red-500'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
        </div>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Access Denied</h1>
        <p className='text-gray-600 mb-6'>
          You have been banned from logging in to the site. Try again after{' '}
          <span className='text-blue-500'>{expireDateEnd}</span>
        </p>
        <p className='text-red-500 mb-6'>Reason: Too many failed login</p>
        <div className='flex flex-col gap-2'>
          <a
            href='mailto:support@learnwithsumit.com'
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50'
          >
            Contact Support
          </a>
          <Link className='text-blue-500' href='/'>
            Go To Home
          </Link>
        </div>
      </div>
    </div>
  )
}
export default BannedPage
