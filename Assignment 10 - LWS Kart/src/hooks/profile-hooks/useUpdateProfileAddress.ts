import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const updateProfileAddress = async (
  userId: string,
  update: IProfileUpdateParam
) => {
  try {
    const { data } = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/address`,
      {
        userId,
        update,
      }
    )
    return data
  } catch (error) {
    throw error
  }
}

const useUpdateProfileAddress = () => {
  const router = useRouter()
  const mutation = useMutation({
    mutationFn: async ({ userId, update }: { userId: string; update: any }) =>
      await updateProfileAddress(userId, update),
    onSuccess: () => router.refresh(),
  })
  return mutation
}

export default useUpdateProfileAddress
