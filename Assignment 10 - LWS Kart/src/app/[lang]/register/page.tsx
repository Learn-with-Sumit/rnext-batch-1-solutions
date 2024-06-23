import { RegisterForm } from '@/components'
import SignIn from '@/components/auth/SignIn'
import { Metadata } from 'next'
import Link from 'next/link'
import { getDictionary } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Register',
  description: 'LWS Kart Register',
}

const RegisterPage = async ({
  params: { lang },
}: {
  params: { lang: ILang['lang'] }
}) => {
  const {
    register: {
      title,
      welcomeMessage,
      orSignupWith,
      alreadyHaveAccount,
      loginNow,
    },
  } = await getDictionary(lang)

  return (
    <div className='contain py-16 dark:bg-slate-700'>
      <div className='max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden bg-white dark:bg-slate-800'>
        <h2 className='text-2xl uppercase font-medium mb-1 text-black dark:text-white'>
          {title}
        </h2>
        <p className='text-gray-600 mb-6 text-sm dark:text-gray-300'>
          {welcomeMessage}
        </p>
        <RegisterForm />
        <div className='mt-6 flex justify-center relative'>
          <div className='text-gray-600 uppercase px-3 bg-white dark:bg-slate-800 dark:text-gray-300 z-10 relative'>
            {orSignupWith}
          </div>
          <div className='absolute left-0 top-3 w-full border-b-2 border-gray-200 dark:border-gray-600' />
        </div>
        <div className='mt-4 flex gap-4'>
          <SignIn medium='facebook' />
          <SignIn medium='google' />
          <SignIn medium='github' />
        </div>
        <p className='mt-4 text-center text-gray-600 dark:text-gray-300'>
          {alreadyHaveAccount}{' '}
          <Link
            href='/login'
            className='text-blue-500 dark:text-blue-400 underline underline-offset-4'
          >
            {loginNow}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
