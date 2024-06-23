import { useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '../../assets/icons/search.svg'
import Logo from '../../assets/logo.svg'
import { SearchContext } from '../../context/index.js'
import useRefreshToken from '../../hooks/api/useRefreshToken.js'
import useAuth from '../../hooks/useAuth.js'
import { generateFullName } from '../../utils/generateFullName.js'
import Search from '../Search/Search.jsx'
import Avatar from './Avatar.jsx'

const Header = () => {
  const location = useLocation()
  const inLoginPath = location.pathname === '/login'
  const inWriteBlogPath = location.pathname === '/write-blog'
  const navigate = useNavigate()
  const { showModal, handleShowModal, setQuery } = useContext(SearchContext)
  useRefreshToken() // this refreshes the token when user first lands on the site

  // if user presses the escape button,the search will close
  useEffect(() => {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handleShowModal(false)
        setQuery('')
      }
    })
  }, [handleShowModal, setQuery])

  const { auth, setAuth } = useAuth()

  const handleLogout = () => {
    setAuth({})
    sessionStorage.removeItem('userdet')
    if (inWriteBlogPath) navigate('/login')
  }

  const isLoggedIn = auth?.token?.accessToken // check if user is logged in

  const { user: { firstName, lastName, id } = {} } = auth
  return (
    <header>
      <nav className='container'>
        {/* Logo */}
        <div>
          <Link to='/'>
            <img className='w-32' src={Logo} alt='lws' />
          </Link>
        </div>
        <div>
          <ul className='flex items-center space-x-5'>
            {isLoggedIn && (
              <li>
                <Link
                  to='/write-blog'
                  className='bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200'
                >
                  Write
                </Link>
              </li>
            )}
            <li>
              {/* search */}
              <button
                onClick={() => handleShowModal(true)}
                className='flex items-center gap-2 cursor-pointer'
              >
                <img src={SearchIcon} alt='Search' />
                <span>Search</span>
              </button>
              {showModal &&
                createPortal(
                  <Search
                    showModal={showModal}
                    handleShowModal={handleShowModal}
                  />,
                  document.body
                )}
            </li>
            <li>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className='text-red-500/80 hover:text-red-500
                  transition-all duration-200'
                >
                  Log Out
                </button>
              ) : (
                <Link
                  to='/login'
                  className={`${
                    inLoginPath
                      ? 'bg-white hover:text-black text-black p-3 rounded'
                      : 'text-white/50 hover:text-white'
                  } transition-all duration-200`}
                >
                  Login
                </Link>
              )}
            </li>
            {/* profile */}
            {isLoggedIn && (
              <Link to={`/profile/${id}`}>
                <li className='flex items-center'>
                  <div
                    className={`avater-img ${
                      auth?.user?.avatar ? '' : 'bg-orange-600'
                    } text-white`}
                  >
                    <Avatar avatar={auth?.user?.avatar} firstName={firstName} />
                  </div>
                  <span className='text-white ml-2'>
                    {generateFullName(firstName, lastName)}
                  </span>
                </li>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}
export default Header
