import { auth } from '@/auth'
import { LoginForm } from '@/components'
import SignIn from '@/components/auth/SignIn'
import ReactQueryProvider from '@/providers/QueryProvider'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getDictionary } from '../dictionaries'

export const metadata: Metadata = {
  title: 'Login',
  description: 'LWS Kart Login',
}

const LoginPage = async ({
  params: { lang },
}: {
  params: { lang: ILang['lang'] }
}) => {
  // if user is logged in, redirect them to home page
  const session = (await auth()) as SessionWith_Id as any

  const accessToken = session?.accessToken as any

  const {
    login: {
      title,
      welcomeMessage,
      orLoginWith,
      noAccountMessage,
      registerNow,
      emailLabel,
      passwordLabel,
      rememberMe,
      forgotPassword,
      loggingIn,
    },
  } = await getDictionary(lang)

  if (accessToken) {
    // take user to admin dashboard if role is admin
    if (session?.user?.role === 'admin') {
      redirect('/admin-dashboard')
    } else {
      // take user to home if role is not admin
      redirect('/')
    }
  }

  return (
    <main>
      <ReactQueryProvider>
        <div className='contain py-16 dark:bg-slate-700 dark:text-white'>
          <div className='max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden dark:bg-slate-800'>
            <h2 className='text-2xl uppercase font-medium mb-1 dark:text-white'>
              {title}
            </h2>
            <p className='text-gray-600 mb-6 text-sm'>{welcomeMessage}</p>
            <LoginForm
              dictionary={{
                emailLabel,
                passwordLabel,
                rememberMe,
                forgotPassword,
                title,
                loggingIn,
              }}
            />
            {/* login with */}
            <div className='mt-6 flex justify-center relative'>
              <div className='text-gray-600 dark:text-white dark:bg-slate-700 uppercase px-3 bg-white z-10 relative'>
                {orLoginWith}
              </div>
              <div className='absolute left-0 top-3 w-full border-b-2 border-gray-200' />
            </div>
            <div className='mt-4 flex gap-4'>
              <SignIn medium='facebook' />
              <SignIn medium='google' />
              <SignIn medium='github' />
            </div>
            {/* ./login with */}
            <p className='mt-4 text-center text-gray-600 dark:text-white'>
              {noAccountMessage}
              <Link
                href='/register'
                className='text-blue-500 underline underline-offset-4'
              >
                {registerNow}
              </Link>
            </p>
          </div>
        </div>
      </ReactQueryProvider>
    </main>
  )
}
export default LoginPage
