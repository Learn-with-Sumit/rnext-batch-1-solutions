import { useContext } from 'react'
import { ThemeContext } from '../../context/index.js'
import { getCurrentDate } from '../../utils/getCurrentDate.js'
import SVG from './SVG.jsx'

const NavDate = () => {
  const formattedDate = getCurrentDate()
  const { isDark } = useContext(ThemeContext)

  return (
    <div className='flex items-center space-x-4'>
      <SVG />
      <span className={`${isDark ? 'text-white' : 'text-black'}`}>
        {formattedDate}
      </span>
    </div>
  )
}
export default NavDate
