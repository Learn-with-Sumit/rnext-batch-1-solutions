import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import useUpdateProfile from '@/hooks/profile-hooks/useUpdateProfileAddress'
import validateBDPhoneNumber from '@/utils/validateBDPhoneNumber'
import { Dispatch, SetStateAction, useState } from 'react'

export const formSchema = (dictionary: any) =>
  z.object({
    postCode: z.string().min(1, { message: dictionary.postCodeError }),
    address: z.string().min(1, { message: dictionary.addressError }),
    phoneNumber: z
      .string()
      .min(1, { message: dictionary.phoneError })
      .refine(
        (value) => (value.length > 0 ? validateBDPhoneNumber(value) : true),
        {
          message: 'Invalid Phone Number',
        }
      ),
  })

const useShippingForm = ({
  user,
  setIsEditing,
  dictionary,
}: SessionWith_Id & { setIsEditing: Dispatch<SetStateAction<boolean>> } & {
  dictionary: IAccountPageDict['accountPage']
}) => {
  const [loading, setLoading] = useState(false)
  const { mutate } = useUpdateProfile()

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(dictionary)),
    defaultValues: {
      postCode: String(user?.shippingAddress?.postCode) ?? '',
      address: user?.shippingAddress?.address ?? '',
      phoneNumber: String(user?.shippingAddress?.phoneNumber) ?? '',
    },
  })
  const {
    setError,
    formState: { errors },
  } = form

  const userId = user._id.toString() ?? user.id.toString()

  function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    setLoading(true)
    const shippingAddress = {
      postCode: Number(values.postCode),
      address: values.address,
      phoneNumber: Number(values.phoneNumber),
      flag: 'shipping',
    }
    mutate(
      { userId, update: shippingAddress as any },
      {
        onSuccess: () => {
          setLoading(false)
          setIsEditing(false)
        },
        onError: (error) =>
          setError('root.updateError', {
            type: 'updateError',
            message: error.message,
          }),
      }
    )
  }

  return { form, onSubmit, loading, errors }
}
export default useShippingForm
