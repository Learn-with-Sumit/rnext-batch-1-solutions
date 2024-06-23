import { auth } from '@/auth'
import { notFound } from 'next/navigation'

const revokeAdminIsUsersPages = async () => {
  const session = (await auth()) as SessionWith_Id

  const isAdmin = session?.user?.role === 'admin'

  // if user is not user, and tries to access this page, show the not found page
  if (isAdmin) {
    notFound()
  }
}
export default revokeAdminIsUsersPages
