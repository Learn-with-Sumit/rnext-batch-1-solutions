/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ActionIcon from '../../assets/icons/3dots.svg'
import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import { BASE_URL } from '../../constants.js'
import useDeleteBlog from '../../hooks/api/useDeleteBlog.js'
import useAuth from '../../hooks/useAuth.js'
import { formatDate } from '../../utils/formatDate.js'
import { getLikeCountString } from '../../utils/getLikeCountString.js'
import handleOutsideClick from '../../utils/handleOutsideClick.js'
import Avatar from '../common/Avatar.jsx'
import Tooltip from '../common/Tooltip.jsx'

const BlogCard = ({ blog, dispatch }) => {
  const { pathname } = useLocation() // is required to programmatically set how the content of the blog card will look like
  const { auth } = useAuth()
  const { mutate } = useDeleteBlog(dispatch)
  const navigate = useNavigate()
  const {
    author: { avatar, firstName, id: authorId, lastName },
    content,
    createdAt,
    id,
    likes,
    thumbnail,
    title,
  } = blog
  const editDeleteButtonRef = useRef(null)

  const [currentReadMore, setCurrentReadMore] = useState([])
  const [editDeleteOpen, setEditDeleteOpen] = useState(false)

  // closing the edit delete pop up when clicked outside
  useEffect(() => {
    if (editDeleteOpen) {
      document.addEventListener('click', (e) =>
        handleOutsideClick(e, editDeleteButtonRef, setEditDeleteOpen)
      )
    } else {
      document.removeEventListener('click', (e) =>
        handleOutsideClick(e, editDeleteButtonRef, setEditDeleteOpen)
      )
    }

    return () =>
      document.removeEventListener('click', (e) =>
        handleOutsideClick(e, editDeleteButtonRef, setEditDeleteOpen)
      )
  }, [editDeleteOpen])

  return (
    <motion.div
      layout
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'tween', duration: 0.2 }}
    >
      <Link
        preventScrollReset={false}
        to={`/blog/${id}`}
        className='blog-card group'
      >
        <img
          className='blog-thumb'
          src={`${BASE_URL}/uploads/blog/${thumbnail}`}
          alt='blog-thumbnail'
        />
        <div className='mt-2 relative'>
          <div>
            <h3 className='text-slate-300 text-xl lg:text-2xl group-hover:text-white transition-colors duration-300'>
              {title}
            </h3>
          </div>
          <p className='mb-6 text-base text-slate-500 mt-1'>
            {pathname === '/' || content.length < 200
              ? content
              : content
                  .slice(0, currentReadMore.includes(id) ? content.length : 207) // show full content when user clicks read more
                  .padEnd(210, '.')}
            {pathname !== '/' &&
            !currentReadMore.includes(id) &&
            content.length > 200 ? (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentReadMore((prevReadMore) => [...prevReadMore, id]) // adding the id of the blog in read more
                }}
                className='text-white cursor-pointer ml-2'
              >
                Read more
              </button>
            ) : (
              pathname !== '/' &&
              content.length > 200 && (
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentReadMore((prevReadMore) =>
                      prevReadMore.filter((blogId) => blogId !== id)
                    )
                  }}
                  className='text-white cursor-pointer ml-2'
                >
                  Read less
                </button>
              )
            )}
            {/* in profile page, the content will look better by slicing it */}
          </p>
          <div className='flex justify-between items-center'>
            <div
              onClick={(e) => {
                e.preventDefault()
                navigate(`/profile/${authorId}`)
              }}
              className='flex items-center capitalize space-x-2 hover:bg-gray-800 p-1 rounded-md transition-all duration-300'
            >
              <Tooltip
                firstName={firstName}
                lastName={lastName}
                avatar={avatar}
                purpose='profileSneakPeek'
              >
                <div className='avater-img bg-indigo-600 text-white'>
                  <Avatar avatar={avatar} firstName={firstName} />
                </div>
                <div>
                  <h5 className='text-slate-500 text-sm'>
                    <button>
                      {firstName} {lastName}
                    </button>
                  </h5>
                  <div className='flex items-center text-xs text-slate-700'>
                    <span>{formatDate(createdAt)}</span>
                  </div>
                </div>
              </Tooltip>
            </div>
            <div className='text-sm px-2 py-1 text-slate-700'>
              <Tooltip likes={likes} purpose='likebox'>
                <span className='relative bg-white rounded-md p-1 hover:bg-slate-200 transition-colors'>
                  {getLikeCountString(likes)}
                </span>
              </Tooltip>
            </div>
          </div>
          {/* action dot */}
          {/* if author exists */}
          {auth.user && auth.user.id === authorId && (
            <div
              ref={editDeleteButtonRef}
              className='absolute right-0 top-0 bg-gray-950 hover:bg-gray-700 transition-colors rounded-full flex p-1 '
            >
              <button
                onClick={(e) => {
                  e.preventDefault() // to prevent event bubbling
                  setEditDeleteOpen(!editDeleteOpen)
                }}
              >
                <img src={ActionIcon} alt='3dots of Action' />
              </button>
              {/* Action Menus Popup */}
              {editDeleteOpen && (
                <div
                  onClick={(e) => e.preventDefault()} // without prevent default the blog card would be clicked when user clicks on edit or delete button
                  className='action-modal-container absolute z-[9999]'
                >
                  <div
                    onClick={() => navigate(`/edit-blog/${id}`)}
                    className='action-menu-item hover:text-lwsGreen'
                  >
                    <img src={EditIcon} alt='Edit' />
                    Edit
                  </div>
                  <button
                    onClick={() => mutate(id)}
                    className='action-menu-item hover:text-red-500'
                  >
                    <img src={DeleteIcon} alt='Delete' />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default BlogCard
