import { RANDOM_RECIPE_IDS } from '@/util/constants.js'
import getRndInteger from '@/util/getRandomInteger.js'
import { cookies } from 'next/headers.js'
import Image from 'next/image.js'
import Link from 'next/link.js'
import LoggedIn from '../Common/LoggedIn.jsx'

const Navbar = () => {
  // random recipe links for the unused recipe button in the navbar
  const randomRecipe = RANDOM_RECIPE_IDS[getRndInteger(1, 10)]

  // gets the user cookie value to see if the user is logged in or not
  const userCookie = cookies().get('user') ?? { value: 'null' }

  return (
    <nav>
      <div className='container flex justify-between py-6'>
        <Link href='/'>
          <Image
            width={120}
            height={120}
            src='/assets/images/logo.png'
            alt='Learn with sumit - Bangladeshi Web Developer Logo'
            className='object-cover h-[40px]'
          />
        </Link>
        <ul className='flex gap-4 text-sm text-gray-500'>
          <li className='py-2 active hover:text-orange-500'>
            <Link href='/'>Home</Link>
          </li>
          <li className='py-2 hover:text-orange-500'>
            <Link href={`/recipe-details/${randomRecipe}`}>Recipe</Link>
          </li>
          <li className='py-2 hover:text-orange-500'>
            <Link href='/'>About us</Link>
          </li>
          <LoggedIn user={userCookie.value} />
        </ul>
      </div>
    </nav>
  )
}
export default Navbar
