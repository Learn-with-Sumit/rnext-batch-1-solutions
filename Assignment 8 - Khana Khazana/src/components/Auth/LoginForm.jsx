'use client'
import { loginUser } from '@/actions.js'
import {
  EMAIL_NOT_FOUND_ERROR_MESSAGE,
  WRONG_PASSWORD_ERROR_MESSAGE,
} from '@/util/constants.js'
import { motion } from 'framer'
import { useFormState } from 'react-dom'
import { ImSad } from 'react-icons/im'
import ModifiableInput from '../Common/ModifiableInput.jsx'
import Submit from './Submit.jsx'

const initialState = {
  user: {
    email: '',
  },
}

const LoginForm = () => {
  const [state, formAction] = useFormState(loginUser, initialState)
  // errors from server response can come
  const hasError = state?.hasError || state?.errorFromServer

  return (
    <form action={formAction} className='login-form'>
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

      <div>
        <label htmlFor='email'>Email Address</label>
        <input
          type='email'
          className={`${
            state?.email ||
            state?.errorFromServer === EMAIL_NOT_FOUND_ERROR_MESSAGE
              ? 'outline outline-1 outline-red-600'
              : ''
          }`}
          name='email'
          id='email'
        />
        <p className='text-red-500 capitalize'>{state?.email}</p>
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <div className='relative'>
          <ModifiableInput
            className={`${
              state?.password ||
              state?.errorFromServer === WRONG_PASSWORD_ERROR_MESSAGE
                ? 'outline outline-1 outline-red-600'
                : ''
            }`}
          />
        </div>
        <p className='text-red-500 capitalize'>{state?.password}</p>
      </div>
      <Submit>Login</Submit>
      {/* error message after form action returns any error */}
      <p className='text-red-500 text-center mt-2'>{state?.errorFromServer}</p>
    </form>
  )
}
export default LoginForm
