import { getDictionary } from '@/app/[lang]/dictionaries'
import { auth } from '@/auth'
import { getRandomProductId } from '@/db/queries/product.queries'
import Link from 'next/link'
import { BiSolidLogIn } from 'react-icons/bi'
import { BsInfoSquareFill } from 'react-icons/bs'
import { CiShoppingCart } from 'react-icons/ci'
import { MdHome } from 'react-icons/md'
import SignOut from '../auth/SignOut'
import DrawerTriggerBtn from '../shop/DrawerTrigger'
import { Button } from '../ui/button'
import Navlink from '../ui/Navlink'
import Dropdown from './Dropdown'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = async ({ lang }: ILang) => {
  const {
    navbar: {
      allCategories,
      home,
      shop,
      login,
      logout,
      loggingOut,
      admin,
      about,
      i_am_feeling_lucky,
    },
  } = await getDictionary(lang)

  const session = (await auth()) as SessionWith_Id
  const userId = session?.user?._id?.toString() ?? session?.user?.id?.toString()
  const isAdmin = session?.user?.role === 'admin'

  const randomProductId = await getRandomProductId()

  return (
    <nav className='dark:bg-gradient-to-r dark:from-gray-700 dark:to-black bg-teal-700'>
      <div className='container flex'>
        <DrawerTriggerBtn />
        {!isAdmin && (
          <div className='px-4 py-2 bg-primary md:flex items-center cursor-pointer relative group hidden'>
            <span className='capitalize ml-2 text-white hidden'>
              {allCategories}
            </span>
            <Dropdown lang={lang} />
          </div>
        )}
        <div className='flex items-center justify-between flex-grow md:pl-12 py-2'>
          <div className='flex items-center space-x-6 capitalize'>
            {!isAdmin && (
              <>
                <Navlink href={`/${lang}`}>
                  <MdHome />
                  <p>{home}</p>
                </Navlink>
                <Navlink href={`/${lang}/shop`}>
                  <CiShoppingCart className='text-xl font-bold' />
                  <p>{shop}</p>
                </Navlink>
                <Navlink href={`/${lang}/about`}>
                  <BsInfoSquareFill />
                  <p>{about}</p>
                </Navlink>
                <Link href={`/${lang}/product-details/${randomProductId}`}>
                  <Button className='hover:border group border-blue-500 hover:bg-orange-500 bg-orange-600 transition-all duration-200 hover:scale-[102%]'>
                    <span className='group-hover:rotate-180 transition-all duration-300'>
                      🍀
                    </span>{' '}
                    {i_am_feeling_lucky}
                  </Button>
                </Link>
              </>
            )}

            {isAdmin && (
              <Navlink href={`/${lang}/admin-dashboard`}>{admin}</Navlink>
            )}
          </div>
          <div className='flex gap-4'>
            <LanguageSwitcher />
            {userId ? (
              <SignOut
                isAdmin={isAdmin}
                loggingOutText={loggingOut}
                text={logout}
              />
            ) : (
              <Navlink href='/login'>
                <BiSolidLogIn />
                {login}
              </Navlink>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
export default Navbar
