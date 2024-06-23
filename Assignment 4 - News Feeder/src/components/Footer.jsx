import { FOOTER_LINKS } from '../constants/constant.js'
import FooterBottom from './FooterBottom.jsx'
import NewsLetter from './NewsLetter.jsx'
import SocialIcons from './SocialIcons.jsx'
import LWSLogo from '../assets/logo_light.png'

const Footer = () => {
  return (
    <footer className='bg-neutral-800 pb-8 pt-20 text-white sm:pt-24'>
      <div className='container mx-auto'>
        <div className='xl:grid xl:grid-cols-12 xl:gap-8'>
          <div className='grid grid-cols-2 gap-8 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:col-span-7 xl:grid-cols-5'>
            <img className='max-md:col-span-2' src={LWSLogo} alt='lws' />
            {/* creating all the links with beautiful javascript 🙂 */}
            {Object.keys(FOOTER_LINKS).map((item, index) => {
              return (
                <ul key={index} role='list' className='space-y-4'>
                  {FOOTER_LINKS[item].map((link, index) => (
                    <li key={index}>
                      <a href='#' className='text-sm font-semibold'>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )
            })}
            <SocialIcons />
          </div>
          <NewsLetter />
        </div>
      </div>
      <FooterBottom />
    </footer>
  )
}
export default Footer
