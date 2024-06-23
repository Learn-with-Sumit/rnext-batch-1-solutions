import { getDictionary } from '@/app/[lang]/dictionaries'
import { auth } from '@/auth'
import { getUserOrders } from '@/db/queries/user.queries'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { OrderPagination } from './OrderPagination'
import OrdersList from './OrdersList'

const MyOrders = async ({
  searchParams,
  lang,
}: {
  searchParams: {
    limit: number
    skip: number
  }
  lang: ILang['lang']
}) => {
  const session = (await auth()) as SessionWith_Id

  const userId = session?.user?._id?.toString() ?? session?.user?.id?.toString()

  const orders = await getUserOrders(
    userId,
    searchParams.limit,
    searchParams.skip
  )

  const {
    accountPage: { my_orders, user_details, no_past },
  } = await getDictionary(lang)

  return (
    <Suspense fallback={<Loader2 className='animate-spin' />}>
      <div className='p-4 mt-12 dark:text-white'>
        <h1 className='text-2xl font-bold mb-4'>{my_orders}</h1>
        {orders.length > 0 ? (
          <div className='mb-8'>
            <div className='flex'>
              <h2 className='text-xl font-semibold mb-2'>{user_details}</h2>
            </div>
            <OrdersList lang={lang} userId={userId} orders={orders} />
          </div>
        ) : (
          <p className='text-blue-500 italic'>{no_past}</p>
        )}
      </div>
      <OrderPagination orders={orders} />
    </Suspense>
  )
}
export default MyOrders
