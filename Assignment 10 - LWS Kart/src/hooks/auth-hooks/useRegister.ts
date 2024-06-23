'use client'
import { validateEmail } from '@/utils/validateEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

export const formSchema = (isLocaleBengali: boolean) =>
  z.object({
    fullName: z.string().min(3, {
      message: isLocaleBengali
        ? 'নাম অবশ্যই কমপক্ষে ৩ অক্ষরের হতে হবে।'
        : 'Name must be at least 3 characters.',
    }),
    email: z.string().refine((email) => validateEmail(email), {
      message: isLocaleBengali ? 'অবৈধ ইমেইল' : 'Invalid Email',
    }),
    password: z.string().min(6, {
      message: isLocaleBengali
        ? 'পাসওয়ার্ড অবশ্যই ৬ অক্ষরের হতে হবে।'
        : 'Password must be at least 6 characters.',
    }),
    confirmedPassword: z.string(),
    agreement: z.boolean().refine((value) => value === true, {
      message: isLocaleBengali
        ? 'এগিয়ে যেতে আপনাকে শর্তাবলী গ্রহণ করতে হবে'
        : 'You must accept the terms and conditions to proceed',
    }),
  })

const useRegister = () => {
  const router = useRouter()
  const { lang } = useParams()
  const isLocaleBengali = lang === 'bn'
  const [focusedField, setFocusedField] = useState('fullName')

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(isLocaleBengali)),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmedPassword: '',
      agreement: false,
    },
  })

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    setError,
  } = form

  const passwordFromInput = watch('password')
  const confirmedPasswordFromInput = watch('confirmedPassword')
  const isPasswordMatching = passwordFromInput === confirmedPasswordFromInput

  async function onSubmit({
    fullName,
    email,
    password,
  }: z.infer<ReturnType<typeof formSchema>>) {
    if (!isPasswordMatching) {
      setError('confirmedPassword', {
        type: 'manual',
        message: isLocaleBengali
          ? 'পাসওয়ার্ড মিলছে না'
          : 'Passwords do not match',
      })
      return
    } else {
      try {
        const { data, status } = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
          {
            name: fullName,
            email,
            password,
            accountType: 'raw',
          }
        )
        if (status === 201) {
          toast.success(
            isLocaleBengali
              ? `${data}, অনুগ্রহ করে এখন লগ ইন করুন`
              : `${data}, Please log in now`,
            { autoClose: 1500 }
          )
          router.push('/login')
        } else if (status === 200) {
          setError('root.userExistsError', {
            type: 'custom',
            message: data,
          })
        }
      } catch (error) {
        toast.error(
          isLocaleBengali ? 'নিবন্ধন ব্যর্থ হয়েছে' : 'Registration failed',
          { autoClose: 1500 }
        )
      }
    }
  }

  return {
    form,
    handleSubmit,
    onSubmit,
    focusedField,
    confirmedPasswordFromInput,
    isPasswordMatching,
    errors,
    setFocusedField,
    passwordFromInput,
    isSubmitting,
  }
}
export default useRegister
