import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const redirectIfNotLoggedIn = async () => {
  const session = (await auth()) as SessionWith_Id
  const userId = session?.user?._id?.toString() ?? session?.user?.id?.toString()

  // if user not logged in, redirect to the login page
  if (!userId) {
    redirect('/login')
  }

  return userId
}
export default redirectIfNotLoggedIn
