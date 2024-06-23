import Image from 'next/image'
import Link from 'next/link'
import AdImage from '../../../public/images/offer.jpg'
import { BackgroundGradient } from '../ui/background-gradient'

const Ads = () => {
  return (
    <div className='container pb-16'>
      <Link href='/shop'>
        <BackgroundGradient className='overflow-hidden'>
          <Image
            height={1200}
            width={2000}
            src={AdImage}
            placeholder='blur'
            alt='ads'
            className='w-full hover:scale-105 duration-300 transition-all'
          />
        </BackgroundGradient>
      </Link>
    </div>
  )
}
export default Ads
