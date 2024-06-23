import { Link, useNavigate } from 'react-router-dom'
import useGetPopular from '../../hooks/api/useGetPopular.js'
import { generateFullName } from '../../utils/generateFullName.js'
import { getLikeCountString } from '../../utils/getLikeCountString.js'
import EmptyResponse from '../common/EmptyResponse.jsx'
import Error from '../common/Error.jsx'
import Tooltip from '../common/Tooltip.jsx'
import PopularSkeleton from './PopularSkeleton.jsx'

const PopularBlogs = () => {
  const navigate = useNavigate()

  const {
    data: { data: blogData } = {},
    error,
    isError,
    isLoading,
  } = useGetPopular()

  let content = null

  if (isLoading) {
    content = Array.from({ length: 4 }).map((item, index) => (
      <PopularSkeleton key={index} />
    ))
  }

  if (!isLoading && isError) {
    content = <Error error={error} message='Could not get popular blogs' />
  }

  if (!isLoading && !isError && blogData.blogs.length === 0) {
    content = <EmptyResponse message='No popular blogs' />
  }

  if (!isLoading && !isError && blogData.blogs.length > 0) {
    content = blogData.blogs.map(
      ({
        id,
        title,
        author: { firstName, lastName, id: authorId, avatar },
        likes,
      }) => (
        <Link to={`blog/${id}`} key={id}>
          <h3 className='text-slate-400 mb-2 font-medium hover:text-slate-300 transition-all cursor-pointer'>
            {title}
          </h3>
          <Tooltip
            firstName={firstName}
            lastName={lastName}
            avatar={avatar}
            purpose='profileSneakPeek'
          >
            <div className='text-slate-600 text-sm'>
              by{' '}
              <button
                className='bg-gray-700 mb-2 p-1 rounded-md text-white hover:bg-gray-600'
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`profile/${authorId}`)
                }}
              >
                {generateFullName(firstName, lastName)}
              </button>
              <span>·</span> {getLikeCountString(likes)}
            </div>
          </Tooltip>
        </Link>
      )
    )
  }

  return (
    <>
      <h3 className='text-slate-300 text-xl lg:text-2xl font-semibold'>
        Most Popular 👍️
      </h3>
      <ul className='space-y-5 my-5'>{content}</ul>
    </>
  )
}
export default PopularBlogs
