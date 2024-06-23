import { useContext } from 'react'
import LWSLogo from '../../assets/logo.png'
import LWSLogo_light from '../../assets/logo_light.png'
import NavDate from './NavDate.jsx'
import Search from './Search.jsx'
import { ThemeContext } from '../../context/index.js'

const Navbar = ({ children }) => {
  const { isDark, setIsDark } = useContext(ThemeContext)

  const handleToggleDarkMode = () => {
    setIsDark((prevDark) => !prevDark)
  }

  return (
    <nav className='border-b border-black py-6 md:py-8'>
      <div className='container mx-auto flex flex-wrap items-center justify-between gap-6'>
        <NavDate />
        <a href='/'>
          <img
            className='max-w-[100px] md:max-w-[165px]'
            src={!isDark ? LWSLogo : LWSLogo_light}
            alt='Lws'
          />
        </a>
        <div className='flex items-center space-x-3 lg:space-x-8'>
          <Search />
          <button
            onClick={handleToggleDarkMode}
            className={`rounded-full ${
              isDark ? 'bg-gray-700' : 'bg-white'
            } shadow-md p-1`}
          >
            {isDark ? '🌙' : '🌞'}
          </button>
        </div>
      </div>
      {children}
    </nav>
  )
}
export default Navbar
