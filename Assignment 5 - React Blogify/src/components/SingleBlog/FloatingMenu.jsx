import { motion } from 'framer-motion'
import { forwardRef, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CommentIcon from '../../assets/icons/comment.svg'
import HeartFilledIcon from '../../assets/icons/heart-filled.svg'
import HeartIcon from '../../assets/icons/heart.svg'
import { FavoriteContext } from '../../context/index.js'
import useFavorite from '../../hooks/api/useFavorite.js'
import useLikeBlog from '../../hooks/api/useLikeBlog.js'
import useAuth from '../../hooks/useAuth.js'
import LikeSVG from '../misc/LikeSVG.jsx'

const FloatingMenu = forwardRef(({ likes, blog }, ref) => {
  const { favorites } = useContext(FavoriteContext)
  const { addToFavorites, removeFromFavorites, isLoading, isError } =
    useFavorite()
  const { id } = useParams()
  const navigate = useNavigate()
  const { mutate } = useLikeBlog(id)
  const { auth } = useAuth()
  const isLoggedIn = auth?.token?.accessToken

  const liked = likes.find((item) => item.id === auth?.user?.id) // get the liked blog

  const handleLike = async () => {
    // if user not logged in, send them to the log in page
    if (!isLoggedIn) {
      toast.info('Log in first', { autoClose: 1000 })
      navigate('/login')
    }
    mutate(id)
  }

  let favContent = null
  if (isLoggedIn) {
    if (isLoading && !isError) {
      favContent = <p>Loading...</p>
    } else if (!isLoading && isError) {
      favContent = <p className='text-red-500'>Error</p>
    } else if (
      !isLoading &&
      !isError &&
      favorites.map((fav) => fav.id).includes(id)
    ) {
      favContent = (
        <img
          onClick={() => removeFromFavorites(blog)}
          src={HeartFilledIcon}
          alt='Favourite'
        />
      )
    } else {
      favContent = (
        <img
          onClick={() => addToFavorites(blog)}
          src={HeartIcon}
          alt='Favourite'
        />
      )
    }
  } else {
    // use local storage to store / remove favorite blogs
    favContent = favorites.map((fav) => fav.id).includes(blog.id) ? (
      <img
        onClick={() => {
          toast.info(
            'Removed from  favorite for offline mode only. Log in to save to your account.',
            { autoClose: 2000 }
          )
          removeFromFavorites(blog)
        }}
        src={HeartFilledIcon}
        alt='Favourite'
      />
    ) : (
      <img
        onClick={() => {
          if (!isLoggedIn)
            toast.info(
              'Added to favorite for offline mode only. Log in to save to your account.',
              { autoClose: 2000 }
            )

          addToFavorites(blog)
        }}
        src={HeartIcon}
        alt='Favourite'
      />
    )
  }

  return (
    <div className='floating-action'>
      <ul className='floating-action-menus'>
        <motion.li
          onClick={handleLike}
          whileHover={{ scale: 1.1 }}
          whileTap={{ y: -10 }}
        >
          <LikeSVG liked={liked} />
          <span>{likes.length}</span>
        </motion.li>
        <li>{favContent}</li>
        <div>
          <li
            onClick={() => {
              /* set the focus and scroll to it when clicked on this button */
              ref.current.focus()
              ref.current.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <img src={CommentIcon} alt='Comments' />
            <span>{blog.comments.length}</span>
          </li>
        </div>
      </ul>
    </div>
  )
})

FloatingMenu.displayName = FloatingMenu

export default FloatingMenu
