import { Link, useNavigate } from 'react-router-dom'
import { WEB_DEV_JOKES } from '../constants.js'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white dark:bg-gray-900 '>
      <div className='container flex items-center justify-center min-h-screen px-6 py-12 mx-auto'>
        <div className='w-full '>
          <div className='flex flex-col items-center max-w-lg mx-auto text-center'>
            <p className='font-medium text-red-500 dark:text-red-400 text-5xl'>
              404 error
            </p>
            <h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
              We lost this page
            </h1>
            <p className='mt-4 text-gray-500 dark:text-gray-400'>
              We searched high and low, but couldn’t find what you’re looking
              for.Let’s find a better place for you to go.
            </p>
            <div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
              <button
                onClick={() => navigate(-1)} // go back one level
                className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg dark:text-gray-200 gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:border-gray-700'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-5 h-5 rtl:rotate-180'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                  />
                </svg>
                <span>Go back</span>
              </button>
              <Link
                to='/'
                className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'
              >
                Take me home
              </Link>
            </div>
          </div>
          <div className='grid w-full max-w-6xl grid-cols-1 gap-8 mx-auto mt-8 sm:grid-cols-2'>
            <div className='p-6 rounded-lg bg-blue-50 dark:bg-gray-800'>
              <span className='text-gray-500 dark:text-gray-400'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25'
                  />
                </svg>
              </span>
              <h3 className='mt-6 font-medium text-gray-700 dark:text-gray-200 '>
                Our blogs
              </h3>
              <p className='mt-2 text-gray-500 dark:text-gray-400 '>
                Read the latest blogs.
              </p>
              <Link
                to='/'
                href='#'
                className='inline-flex items-center mt-4 text-sm text-blue-500 gap-x-2 dark:text-blue-400 hover:underline'
              >
                <span>View latest blogs</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-5 h-5 rtl:rotate-180'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                  />
                </svg>
              </Link>
            </div>
            <div className='p-6 rounded-lg bg-blue-50 dark:bg-gray-800'>
              <span className='text-gray-500 dark:text-gray-400'>
                <JokeSVG />
              </span>
              <h3 className='mt-6 font-medium text-gray-700 dark:text-gray-200 '>
                Random Joke
              </h3>
              <p className='mt-2 text-gray-500 dark:text-gray-400 '>
                {WEB_DEV_JOKES[Math.floor(Math.random() * 10)]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default ErrorPage

const JokeSVG = () => {
  return (
    <svg
      fill='#708080'
      height='25px'
      width='25px'
      version='1.1'
      id='Capa_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      viewBox='0 0 121.668 121.668'
      xmlSpace='preserve'
    >
      <g>
        <path
          d='M60.834,121.668C27.29,121.668,0,94.378,0,60.834S27.29,0,60.834,0s60.834,27.29,60.834,60.834
		S94.378,121.668,60.834,121.668z M60.834,6C30.599,6,6,30.599,6,60.834c0,30.236,24.599,54.834,54.834,54.834
		s54.834-24.599,54.834-54.834C115.668,30.598,91.069,6,60.834,6z'
        />
        <circle cx='26.828' cy='60.835' r='8.364' />
        <circle cx='94.841' cy='60.835' r='8.364' />
        <path
          d='M83.306,83.971H37.964v6h17.605c0.622,7.825,6.584,13.986,13.834,13.986s13.212-6.161,13.834-13.986h0.068L83.306,83.971
		L83.306,83.971z M69.403,97.957c-3.966,0-7.249-3.478-7.805-7.986h15.608C76.651,94.48,73.369,97.957,69.403,97.957z'
        />
      </g>
    </svg>
  )
}
