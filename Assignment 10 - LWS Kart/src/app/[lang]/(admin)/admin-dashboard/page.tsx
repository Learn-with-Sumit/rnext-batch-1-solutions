import AdminCarousel from '@/components/admin/AdminCarousel'
import LinkButtons from '@/components/admin/LinkButtons'
import revokeUserInAdminPanel from '@/utils/revokeUserInAdminPanel'
import { Metadata } from 'next'
import { MdAdminPanelSettings } from 'react-icons/md'
import { getDictionary } from '../../dictionaries'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'LWS Kart Admin Dashboard',
}

const AdminDashboardPage = async ({
  params: { lang },
}: {
  params: { lang: ILang['lang'] }
}) => {
  // checks if user is admin or not
  await revokeUserInAdminPanel()

  const {
    adminPage: { hi, link_text, price_chart, product_list },
  } = await getDictionary(lang)

  return (
    <main className='min-h-[50vh] mx-20 md:mx-40 lg:mx-60 mt-12 flex justify-center items-center flex-col dark:bg-slate-800 dark:text-white'>
      <AdminCarousel />
      <div className='relative flex flex-col items-center'>
        <h2 className='my-6 text-xl flex gap-2 items-center'>
          <MdAdminPanelSettings className='text-2xl' />
          <p>{hi}</p>
        </h2>
        <p>{link_text}</p>
        <LinkButtons
          priceChartLocale={price_chart}
          productListLocale={product_list}
          lang={lang}
        />
      </div>
    </main>
  )
}
export default AdminDashboardPage
