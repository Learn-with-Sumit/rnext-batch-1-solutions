import { validateEmail } from '@/utils/validateEmail'
import { z } from 'zod'

export const ResetFormSchema = z.object({
  email: z
    .string()
    .refine((value) => validateEmail(value), { message: 'Invalid Email' }),
  recoveryEmail: z
    .string()
    .refine((value) => validateEmail(value), { message: 'Invalid Email' }),
})

export const loginFormSchema = z.object({
  email: z.string().refine((email) => validateEmail(email), {
    message: 'Invalid Email',
  }),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
  remember: z.boolean(),
})

export const NewPasswordFormSchema = z.object({
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
})
