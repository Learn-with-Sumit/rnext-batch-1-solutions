import { useContext } from 'react'
import { ThemeContext } from '../../context/index.js'

const Thumbnail = ({ imgUrl, content, author }) => {
  const { isDark } = useContext(ThemeContext)

  return (
    <div className='col-span-12 lg:col-span-8'>
      {imgUrl && <img className='w-full' src={imgUrl} alt='thumb' />}
      {imgUrl && author && (
        <p
          className={`mb-2 mt-1 text-base ${
            isDark ? 'text-white' : 'text-[#5C5955]'
          } `}
        >
          Illustration: {author?.startsWith('By') ? 'Amir Vera' : author}
        </p>
      )}
      <p className='text-blue-400'>{content}</p>
    </div>
  )
}
export default Thumbnail
