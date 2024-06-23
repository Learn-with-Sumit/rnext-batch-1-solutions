import { auth } from '@/auth'
import Link from 'next/link'

const Custom404 = async () => {
  const session = (await auth()) as SessionWith_Id

  const isAdmin = session?.user?.role === 'admin'

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-md shadow-md text-center'>
        <h1 className='text-6xl font-bold text-red-500 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Page Not Found
        </h2>

        {isAdmin ? (
          <p className='text-lg text-gray-700 mb-8'>
            This page is not available for admin
          </p>
        ) : (
          <p>Sorry, the page you are looking for does not exist.</p>
        )}
        {isAdmin ? (
          <Link href='/admin-dashboard'>
            <div className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
              Go to dashboard
            </div>
          </Link>
        ) : (
          <Link href='/'>
            <div className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
              Go Back Home
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Custom404
