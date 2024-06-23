import { getDictionary } from '@/app/[lang]/dictionaries'
import BannerCarousel from './BannerCarousel'
import BannerText from './BannerText'
import MotionButton from './MotionButton'

const Banner = async ({ lang }: ILang) => {
  const {
    banner: { mainText, subText, shopNow },
  } = await getDictionary(lang)

  return (
    <div className='relative'>
      <BannerCarousel />
      <div className='absolute bg-black bg-opacity-40 inset-0 flex flex-col justify-center items-center'>
        <div className='container text-center '>
          <BannerText lang={lang} mainText={mainText} />
          <p className='text-white animate-fadeUp'>
            {subText.slice(0, Math.floor(subText.length / 2))}
            <br />
            {subText.slice(Math.floor(subText.length / 2), subText.length)}
          </p>
          <MotionButton
            href='/shop'
            className='bg-red-500 mt-12 border border-primary text-white px-8 py-3 font-medium 
            rounded-md hover:bg-red-600 hover:text-primary flex items-center justify-center'
            icon='shop'
            text={shopNow}
          />
        </div>
      </div>
    </div>
  )
}

export default Banner
