'use client'
import { getFavoritesOfUser, logOut } from '@/actions.js'
import { useAuth } from '@/hooks/useAuth.js'
import { useFavorites } from '@/hooks/useFavorite.js'
import { motion } from 'framer'
import Link from 'next/link.js'
import { useEffect } from 'react'
import { CgProfile } from 'react-icons/cg'

const LoggedIn = ({ user }) => {
  // without JSON.parse we get a warning
  const parsedUserObject = user && JSON.parse(user)
  const { setUser, user: loggedInUser } = useAuth()
  const { setFavorites } = useFavorites()

  // set the auth context user from the cookies
  useEffect(() => {
    if (parsedUserObject?.email) {
      setUser(parsedUserObject)
    }

    // fetch favorites of the user that is logged in by taking the users id from cookies
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavoritesOfUser(parsedUserObject?._id)
        setFavorites(favorites ?? [])
      } catch (error) {
        console.log(error)
      }
    }
    fetchFavorites()
  }, [parsedUserObject?.email])

  // logs the user out and clears the favorites and user value as a illusion of optimistic update
  const handleLogOut = () => {
    logOut()
    setFavorites([])
    setUser({})
  }

  // if logged in show logged in users name
  return loggedInUser?.email ? (
    <>
      <button className='flex gap-2 items-center py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center hover:-translate-y-1 duration-200'>
        <div>
          <CgProfile className='text-lg' />
        </div>
        <li>{loggedInUser?.firstName}</li>
      </button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleLogOut}
        className='py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center hover:bg-orange-500 transition-all'
      >
        Log out
      </motion.button>
    </>
  ) : (
    <Link
      href='/login'
      className='py-2 bg-[#eb4a36] px-6 rounded-md text-white content-center hover:-translate-y-1 duration-200 focus:translate-y-0'
    >
      <li>Login</li>
    </Link>
  )
}
export default LoggedIn
