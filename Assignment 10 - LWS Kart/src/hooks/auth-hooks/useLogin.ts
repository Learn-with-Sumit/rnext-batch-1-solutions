'use client'
import { doSignOut, login } from '@/app/actions/auth.actions'
import checkIfUserExists from '@/utils/checkIfUserExists'
import { validateEmail } from '@/utils/validateEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import moment from 'moment'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'
import useAddToCart from '../cart-hooks/useAddToCart'
import useMoveOfflineProductsToDB from '../product-hooks/useMoveOfflineProductsToDB'

export const formSchema = (isLocaleBengali: boolean) =>
  z.object({
    email: z.string().refine((email) => validateEmail(email), {
      message: isLocaleBengali ? 'অবৈধ ইমেইল' : 'Invalid Email',
    }),
    password: z.string(),
    remember: z.boolean(),
  })

const useLogin = () => {
  const { toastId } = useAddToCart()
  const router = useRouter()
  const [focusedField, setFocusedField] = useState('email')
  const { lang } = useParams()
  const isLocaleBengali = lang === 'bn'

  const moveOfflineProductsToDB = useMoveOfflineProductsToDB()

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(isLocaleBengali)),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })
  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form

  const searchParams = useSearchParams()

  const onSubmit = async (values: z.infer<ReturnType<typeof formSchema>>) => {
    // check if email exists and show error if email does not exist
    const status = await checkIfUserExists(values.email)

    if (!status) {
      setError('root.serverError', {
        type: 'email',
        message: 'No user by that email',
      })
    } else {
      try {
        const loggedInUser = (await login(values)) as any

        if (!loggedInUser) {
          setError('root.serverError', {
            type: 'login',
            message: 'Wrong Credentials',
          })
        }

        // get the jail expire date time
        const jailExpiresDate = loggedInUser?.jail.expires as string

        // if user is banned for too many failed login attempt, take them to banned page to show a message
        if (jailExpiresDate) {
          const currentDate = moment()

          if (currentDate.isBefore(jailExpiresDate)) {
            await doSignOut()
            router.push(`/banned/${loggedInUser?._id}`)
          } else {
            if (loggedInUser.role === 'admin') {
              router.push('/admin-dashboard')
            } else {
              if (loggedInUser._id) {
                // without dismissing, the toast would show up after user logging in for the other logic i have in page level
                toast.dismiss(toastId)

                await moveOfflineProductsToDB(loggedInUser)

                // redirect the user to the page they wanted to go
                const redirectedBy = searchParams.get('redirected_by')

                if (redirectedBy) {
                  router.push(`/${redirectedBy}`)
                } else {
                  router.push('/')
                }
              }
            }
          }
        } else {
          return loggedInUser
        }
      } catch (e) {
        console.error(e)
        setError('root.serverError', {
          type: 'login',
          message: 'Wrong credentials',
        })
      }
    }
  }

  return {
    moveOfflineProductsToDB,
    onSubmit,
    form,
    focusedField,
    setFocusedField,
    handleSubmit,
    isSubmitting,
    errors,
  }
}
export default useLogin
