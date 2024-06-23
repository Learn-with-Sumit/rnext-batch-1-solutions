'use client'
import { registerUser } from '@/actions.js'
import { motion } from 'framer'
import { useFormState } from 'react-dom'
import { ImSad } from 'react-icons/im'
import ModifiableInput from '../Common/ModifiableInput.jsx'
import Submit from './Submit.jsx'

const RegisterForm = () => {
  const [error, formAction] = useFormState(registerUser, null)
  const hasError = error?.hasError || error?.errorFromServer

  return (
    <form action={formAction} className='login-form'>
      <div>
        <motion.div
          className='relative'
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: hasError ? 1 : 0,
            y: hasError ? 0 : 20,
          }}
        >
          <ImSad className='absolute text-2xl text-center w-full text-red-500' />
        </motion.div>
        <label htmlFor='fname'>First Name</label>
        <input
          type='text'
          name='fname'
          className={`${
            error?.fname ? 'outline outline-1 outline-red-600' : ''
          }`}
          id='fname'
        />
        <p className='text-red-500 capitalize'>{error?.fname}</p>
      </div>
      <div>
        <label htmlFor='lname'>Last Name</label>
        <input
          type='text'
          name='lname'
          className={`${
            error?.lname ? 'outline outline-1 outline-red-600' : ''
          }`}
          id='lname'
        />
        <p className='text-red-500 capitalize'>{error?.lname}</p>
      </div>
      <div>
        <label htmlFor='email'>Email Address</label>
        <input
          type='email'
          name='email'
          className={`${
            error?.email || error?.errorFromServer
              ? 'outline outline-1 outline-red-600'
              : ''
          }`}
          id='email'
        />
        <p className='text-red-500 capitalize'>{error?.email}</p>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <div className='relative'>
          <ModifiableInput
            className={`${
              error?.password ? 'outline outline-1 outline-red-600' : ''
            }`}
          />
        </div>
        <p className='text-red-500 capitalize'>{error?.password}</p>
      </div>
      <Submit>Create Account</Submit>
      {/* error message after form action returns any error */}
      <p className='text-red-500 text-center mt-2 capitalize'>
        {error?.errorFromServer}
      </p>
    </form>
  )
}
export default RegisterForm
