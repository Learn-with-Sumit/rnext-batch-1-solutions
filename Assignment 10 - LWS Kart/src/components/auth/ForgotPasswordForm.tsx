'use client'

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
import useForgotPassword from '@/hooks/profile-hooks/useForgotPassword'
import { Loader2 } from 'lucide-react'
import { MdCheck } from 'react-icons/md'

export const ForgotPasswordForm = ({ dictionary }: any) => {
  const {
    password_reset,
    enter_your_email,
    send_password_reset,
    reset_email_sent,
    enter_resend_account_email,
  } = dictionary
  const { onSubmit, isSubmitting, form, isSuccess } = useForgotPassword()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 shadow-md p-10 rounded-md bg-blue-400 min-w-96 min-h-80 flex flex-col justify-center'
      >
        <p className='font-semibold text-xl'>{password_reset}</p>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{enter_your_email}</FormLabel>
              <FormControl>
                <Input placeholder='sumitsaha@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='recoveryEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{enter_resend_account_email}</FormLabel>
              <FormControl>
                <Input placeholder='sumitsaha@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type='submit'>
          {isSubmitting && <Loader2 className='animate-spin mr-2' />}
          <p>{send_password_reset}</p>
        </Button>
        {isSuccess && (
          <p className='text-white italic text-xs bg-green-500 rounded-md p-2 flex gap-2 items-center'>
            <MdCheck />
            {reset_email_sent}
          </p>
        )}
      </form>
    </Form>
  )
}
