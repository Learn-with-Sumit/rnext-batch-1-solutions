import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { resetPassword } from '@/app/actions/auth.actions'
import { validateEmail } from '@/utils/validateEmail'
import { useState } from 'react'

const FormSchema = z.object({
  email: z
    .string()
    .refine((value) => validateEmail(value), { message: 'Invalid Email' }),
  recoveryEmail: z
    .string()
    .refine((value) => validateEmail(value), { message: 'Invalid Email' }),
})

const useForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      recoveryEmail: '',
    },
  })

  const {
    setError,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const data = await resetPassword({
        email: values.email,
        recoveryEmail: values.recoveryEmail,
      })
      if (data?.error) {
        setError('email', { type: 'emailError', message: data?.error })
      }
      if (data?._id) {
        setIsSuccess(true)
      }
    } catch (error) {
      return null
    }
  }

  return { onSubmit, isSubmitting, form, isSuccess }
}
export default useForgotPassword
