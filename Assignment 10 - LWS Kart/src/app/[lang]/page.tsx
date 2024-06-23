import {
  Ads,
  Banner,
  Categories,
  Features,
  NewArrival,
  Trendings,
} from '@/components'
import Advertising from '@/components/home/Advertising'
import revokeAdminIsUsersPages from '@/utils/revokeAdminIsUsersPages'

const jsonLd = {
  '@context': process.env.BASE_URL,
  '@type': 'LWS Kart - E-commerce website',
  name: 'LWS Kart',
}

export default async function Home({ params: { lang } }: { params: ILang }) {
  // this will not let admin access the home page
  await revokeAdminIsUsersPages()
  return (
    <section className='min-h-[40vh] dark:bg-slate-800'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Advertising />
      <Banner lang={lang} />
      <Features lang={lang} />
      <Categories lang={lang} />
      <NewArrival lang={lang} />
      <Ads />
      <Trendings lang={lang} />
    </section>
  )
}
