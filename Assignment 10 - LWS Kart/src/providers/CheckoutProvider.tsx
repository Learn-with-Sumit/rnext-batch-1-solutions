'use client'

import { CheckoutContext } from '@/context'
import validateBDPhoneNumber from '@/utils/validateBDPhoneNumber'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const checkoutFormSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required' }),
  lastName: z.string().min(1, { message: 'Last Name is required' }),
  region: z.string().min(1, { message: 'Country/Region is required' }),
  address: z.string().min(1, { message: 'Street address is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .refine((value) => validateBDPhoneNumber(value), {
      message: 'Invalid Phone number',
    }),
  email: z.string().email({ message: 'Invalid email address' }),
  agreement: z.boolean({ message: 'Agreement is required' }),
  payment: z.string().min(1, { message: 'Must add a card number' }),
  cvv: z.string().min(1, { message: 'Must add a cvv' }),
})

const CheckoutProvider = ({ children }: WrapperChild) => {
  const form = useForm({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      region: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      agreement: false,
    },
  }) as any

  return (
    <CheckoutContext.Provider value={{ form }}>
      {children}
    </CheckoutContext.Provider>
  )
}

export default CheckoutProvider
