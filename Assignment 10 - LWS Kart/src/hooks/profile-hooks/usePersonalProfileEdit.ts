import { updatePersonalProfile } from '@/app/actions/profile.actions'
import validateBDPhoneNumber from '@/utils/validateBDPhoneNumber'
import { validateEmail } from '@/utils/validateEmail'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const usePersonalProfileEdit = ({
  user,
  setIsEditing,
}: SessionWith_Id & { setIsEditing: Dispatch<SetStateAction<boolean>> }) => {
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState('account')
  const [imageUploaded, setImageUploaded] = useState(false)
  const router = useRouter()
  const { lang } = useParams()

  const accountSchema = z.object({
    name: z.string().min(1, { message: 'Name cannot be empty' }),
    email: z
      .string()
      .min(1, { message: 'Email cannot be empty' })
      .refine((value) => validateEmail(value), { message: 'Invalid email' }),
    phoneNumber: z
      .string()
      .refine(
        (value) => (value.length > 0 ? validateBDPhoneNumber(value) : true),
        {
          message: 'Invalid Phone Number',
        }
      ),
    image: z.string(),
  })

  const passwordSchema = z.object({
    oldPassword: z.string().min(1, { message: 'Old Password cannot be empty' }),
    password: z
      .string()
      .min(1, { message: 'New Password cannot be empty' })
      .min(6, {
        message:
          lang === 'bn'
            ? 'পাসওয়ার্ড অবশ্যই ৬ অক্ষরের হতে হবে।'
            : 'Password must be at least 6 characters.',
      }),
  })

  const form = useForm({
    resolver: zodResolver(tab === 'account' ? accountSchema : passwordSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      phoneNumber: user?.phoneNumber ?? '',
      image: '',
      oldPassword: '',
      password: '',
    },
  })

  const {
    setError,
    setValue,
    formState: { errors },
    handleSubmit,
  } = form

  const userId = user._id.toString()

  // track initial values
  const [initialValues, setInitialValues] = useState(form.getValues())

  useEffect(() => {
    setInitialValues(form.getValues())
  }, [form])

  // watch form values
  const currentValues = useWatch({ control: form.control })

  // check if values have changed
  const valuesChanged =
    JSON.stringify(initialValues) !== JSON.stringify(currentValues)

  // let's not let the google and facebook user update their email, profile picture and password
  const isAccountTypeFacebookOrGoogle = user?.accountType !== 'raw'

  async function onSubmit(values: any) {
    try {
      setLoading(true)
      const data = (await updatePersonalProfile(userId, values)) as {
        msg: string
        status: string
      }
      // if error message comes from server, show it
      if (data?.status) {
        setError('root.updateError', {
          type: 'updateError',
          message: data?.msg,
        })
      } else {
        toast.success('Profile updated successfully', { autoClose: 1000 })
        setIsEditing(false)
        router.refresh()
      }
    } catch (error) {
      setError('root.updateError', {
        type: 'updateError',
        message: 'Error updating profile',
      })
    } finally {
      setLoading(false)
    }
  }
  return {
    tab,
    setTab,
    isAccountTypeFacebookOrGoogle,
    handleSubmit,
    onSubmit,
    form,
    setImageUploaded,
    setValue,
    imageUploaded,
    loading,
    valuesChanged,
    errors,
  }
}
export default usePersonalProfileEdit
