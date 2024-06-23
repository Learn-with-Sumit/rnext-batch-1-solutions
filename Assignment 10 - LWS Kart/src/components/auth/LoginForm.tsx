'use client'

import { Form } from '@/components/ui/form'
import useLogin from '@/hooks/auth-hooks/useLogin'
import getFocusedFieldIcons from '@/utils/getFocusedFieldIcons'
import { motion } from 'framer-motion'
import { Check, Copy, Loader2 } from 'lucide-react'
import { useState } from 'react'
import FormRow from './FormRow'

const LoginForm = ({ dictionary }: ILoginLocale) => {
  const {
    onSubmit,
    form,
    handleSubmit,
    focusedField,
    setFocusedField,
    isSubmitting,
    errors,
  } = useLogin()

  const { emailLabel, passwordLabel, title, loggingIn } = dictionary!

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // THIS IS MADE FOR THE EASE OF USE FOR THE ASSIGNMENT EVALUATOR TO COPY THE ADMIN EMAIL AND ADMIN PASSWORD TO CHECK THE ADMIN FUNCTIONALITY, OBVIOUSLY, THIS IS NOT A REAL LIFE USE CASE, THANKS
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPassword, setCopiedPassword] = useState(false)

  const handleCopy = (text: string, type: 'email' | 'password') => {
    navigator.clipboard.writeText(text)
    if (type === 'email') {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } else {
      setCopiedPassword(true)
      setTimeout(() => setCopiedPassword(false), 2000)
    }
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const errorTypeIsLogin = errors?.root?.serverError?.type === 'login'
  const errorTypeIsEmail = errors?.root?.serverError?.type === 'email'

  return (
    <Form {...form}>
      <div className='flex items-center space-x-2 p-2 border rounded bg-gray-100 shadow-md shadow-white'>
        <p className='italic text-blue-500'>Admin Email: admin@admin.com</p>
        <button
          type='button'
          className='text-blue-500 hover:text-blue-700'
          onClick={() => handleCopy('admin@admin.com', 'email')}
        >
          {copiedEmail ? (
            <Check className='text-red-500' size={16} />
          ) : (
            <Copy className='text-red-500' size={16} />
          )}
        </button>
      </div>
      <div className='flex items-center space-x-2 p-2 border rounded bg-gray-100 mt-2'>
        <p className='italic text-blue-500'>Admin Password: adminn</p>
        <button
          type='button'
          className='text-blue-500 hover:text-blue-700'
          onClick={() => handleCopy('adminn', 'password')}
        >
          {copiedPassword ? (
            <Check className='text-red-500' size={16} />
          ) : (
            <Copy className='text-red-500' size={16} />
          )}
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex justify-center h-4 mt-4'
        >
          {getFocusedFieldIcons(focusedField)}
        </motion.div>
        <div className='space-y-2'>
          <FormRow
            focusedField={focusedField}
            form={form}
            label={emailLabel}
            name='email'
            placeholder='sumitsaha@gmail.com'
            setFocusedField={setFocusedField}
          />
          <FormRow
            form={form}
            label={passwordLabel}
            name='password'
            placeholder='******'
            setFocusedField={setFocusedField}
          />
        </div>
        <FormRow
          dictionary={dictionary}
          form={form}
          name='remember'
          setFocusedField={setFocusedField}
        />
        <div className='mt-4'>
          <motion.button
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type='submit'
            className='block w-full py-2 text-center text-black dark:text-white hover:bg-slate-200 bg-primary border border-primary rounded hover:text-primary transition uppercase font-roboto font-medium mt-4'
          >
            {isSubmitting ? (
              <div className='flex gap-2 justify-center items-center'>
                <p>{loggingIn}</p>
                <Loader2 className='animate-spin' />
              </div>
            ) : (
              <p className='dark:text-white'>{title}</p>
            )}
          </motion.button>
        </div>
        {errorTypeIsLogin || errorTypeIsEmail ? (
          <p className='text-red-500 italic text-md text-center mt-2'>
            {errors?.root?.serverError?.message}
          </p>
        ) : null}
      </form>
    </Form>
  )
}

export default LoginForm
