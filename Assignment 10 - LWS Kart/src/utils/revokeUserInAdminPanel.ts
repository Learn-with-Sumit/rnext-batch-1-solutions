import { auth } from '@/auth'
import { notFound } from 'next/navigation'

const revokeUserInAdminPanel = async () => {
  const session = (await auth()) as SessionWith_Id

  const isAdmin = session?.user?.role === 'admin'

  // if user is not admin, and tries to access this page, show the error page
  if (!isAdmin) {
    notFound()
  }
}
export default revokeUserInAdminPanel
