'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { newPassword } from '@/app/actions/auth.actions'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { MdCheck } from 'react-icons/md'

const FormSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})

export const NewPasswordForm = ({ dictionary }: any) => {
  const {
    password_reset,
    enter_new_pass,
    accountPage: { submit },
  } = dictionary
  const searchParams = useSearchParams()
  // get the token from search params
  const token = searchParams.get('token')
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState('')
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
    },
  })

  const {
    setError,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      const data = await newPassword({ password: values.password }, token)
      if (data?.error) {
        setError('password', { type: 'passwordError', message: data?.error })
      }
      if (data?.success) {
        setIsSuccess(data.success)
        // take user to login page after 2 seconds
        setTimeout(() => router.push('/login'), 2000)
      }
    } catch (error) {
      return null
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 shadow-md p-10 rounded-md bg-blue-400 min-w-96 min-h-80 flex flex-col justify-center'
      >
        <p className='font-semibold text-xl'>{password_reset}</p>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{enter_new_pass}</FormLabel>
              <FormControl>
                <Input type='password' placeholder='******' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type='submit'>
          {isSubmitting && <Loader2 className='animate-spin mr-2' />}
          <p>{submit}</p>
        </Button>
        {isSuccess.length > 0 && (
          <p className='text-white italic text-xs bg-green-500 rounded-md p-2 flex gap-2 items-center'>
            <MdCheck />
            {isSuccess}
          </p>
        )}
      </form>
    </Form>
  )
}
