import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../constants.js'
import { SearchContext } from '../../context/index.js'
import { formatDate } from '../../utils/formatDate.js'
import { generateFullName } from '../../utils/generateFullName.js'
import { getLikeCountString } from '../../utils/getLikeCountString.js'
import Avatar from '../common/Avatar.jsx'

const TopDetails = ({ blog = {} }) => {
  const { setQuery, handleShowModal } = useContext(SearchContext)

  const {
    data: {
      author: { firstName, lastName, avatar, id: authorId } = {},
      content: blogContent,
      createdAt,
      likes,
      tags,
      thumbnail,
      title,
    } = {},
  } = blog

  const handleTagClick = (tag) => {
    handleShowModal(true)
    setQuery(tag)
    window.scroll({ top: 0, behavior: 'smooth' })
  }

  return (
    <section>
      <div className='container text-center py-8'>
        <h1 className='font-bold text-3xl md:text-5xl'>{title}</h1>
        <div className='flex justify-center items-center my-4 gap-4'>
          <Link
            to={`/profile/${authorId}`}
            className='flex items-center capitalize space-x-2'
          >
            <div className='avater-img bg-indigo-600 text-white'>
              <Avatar avatar={avatar} firstName={firstName} />
            </div>
            <h5 className='text-slate-500 text-sm'>
              {generateFullName(firstName, lastName)}
            </h5>
          </Link>
          <span className='text-sm text-slate-700 dot'>
            {formatDate(createdAt)}
          </span>
          <span className='text-sm text-slate-700 dot'>
            {getLikeCountString(likes)}
          </span>
        </div>
        <img
          className='mx-auto w-full md:w-8/12 object-cover h-80 md:h-96'
          src={`${BASE_URL}/uploads/blog/${thumbnail}`}
          alt='thumbnail'
        />
        {/* Tags */}
        <ul className='tags'>
          {tags.split(',').map((tag) => (
            <li
              value={tag}
              onClick={() => handleTagClick(tag)}
              key={crypto.randomUUID()}
            >
              {tag}
            </li>
          ))}
        </ul>
        {/* Content */}
        <div className='mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left'>
          {blogContent}
        </div>
      </div>
    </section>
  )
}
export default TopDetails
