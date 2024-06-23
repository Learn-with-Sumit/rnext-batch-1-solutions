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

const useBillingForm = ({
  user,
  setIsEditing,
  dictionary,
}: SessionWith_Id & { setIsEditing: Dispatch<SetStateAction<boolean>> } & {
  dictionary: IAccountPageDict['accountPage']
}) => {
  const [loading, setLoading] = useState(false)
  const { mutate } = useUpdateProfile()
  const {
    shippingAddress: { postCode, phoneNumber, address },
  } = user

  const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
    resolver: zodResolver(formSchema(dictionary)),
    defaultValues: {
      postCode: String(user?.billingAddress?.postCode) ?? '',
      address: user?.billingAddress?.address ?? '',
      phoneNumber: String(user?.billingAddress?.phoneNumber) ?? '',
    },
  })
  const {
    setError,
    setValue,
    formState: { errors },
    reset,
  } = form

  const userId = user._id.toString() ?? user.id.toString()

  // if user chooses same as shipping address then the form will populate with the shipping address values
  const handleCheckbox = (checked: boolean) => {
    if (checked) {
      setValue('postCode', String(postCode))
      setValue('phoneNumber', String(phoneNumber))
      setValue('address', address)
    } else {
      reset()
    }
  }

  function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
    setLoading(true)
    const billingAddress = {
      postCode: Number(values.postCode),
      address: values.address,
      phoneNumber: Number(values.phoneNumber),
      flag: 'billing',
    }
    // mutation for submitting
    mutate(
      { userId, update: billingAddress as any },
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
  return {
    form,
    onSubmit,
    errors,
    handleCheckbox,
    loading,
  }
}
export default useBillingForm
