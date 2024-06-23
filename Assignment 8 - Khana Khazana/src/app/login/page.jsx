import LoginForm from '@/components/Auth/LoginForm.jsx'
import Link from 'next/link.js'

const LoginPage = () => {
  return (
    <main>
      <section className='h-screen grid place-items-center'>
        <div className='max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md'>
          <h4 className='font-bold text-2xl'>Sign in</h4>
          <LoginForm />
          <p className='text-center text-xs text-gray-600'>Or</p>
          <Link
            href='/register'
            className='underline text-sm mx-auto block text-gray-600 mt-4 text-center'
          >
            Create New Account
          </Link>
        </div>
      </section>
    </main>
  )
}
export default LoginPage
