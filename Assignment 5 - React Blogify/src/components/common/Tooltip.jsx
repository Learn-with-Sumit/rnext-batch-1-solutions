/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import LikeIcon from '../../assets/icons/like.svg'
import { BASE_URL } from '../../constants.js'
import useGetLikedUsers from '../../hooks/api/useGetLikedUsers.js'
import { generateFullName } from '../../utils/generateFullName.js'

const TooltipContainer = ({ children, className }) => {
  return (
    <div
      className={`opacity-0 flex flex-col w-48 text-black text-center text-xs rounded-lg py-1 pt-4 absolute ${className} ml-14 px-3 pointer-events-none transition-all duration-300 h-fit`}
    >
      {children}
    </div>
  )
}

const Tooltip = ({ children, likes = [], purpose, ...props }) => {
  const { data, pending } = useGetLikedUsers(likes)

  let content = null

  if (purpose === 'likebox') {
    content = (
      <motion.div
        whileHover={{ scale: 1.2 }}
        className='group/likebox cursor-pointer inline-block border-gray-400 text-center'
      >
        {children}
        {likes.length ? (
          <TooltipContainer className='group-hover/likebox:opacity-100 bg-white'>
            {pending
              ? 'Loading...'
              : data.slice(0, 4).map((result, index) => (
                  <div
                    className='flex gap-4 mb-2 items-center justify-start'
                    key={index}
                  >
                    <img
                      className='bg-blue-400 rounded'
                      src={LikeIcon}
                      alt='like'
                    />

                    <p>
                      {generateFullName(
                        result?.data?.firstName,
                        result?.data?.lastName
                      )}
                    </p>
                  </div>
                ))}
            {/* limiting only 4 liked users in the list so ui does not break */}
            {data.length > 4 && <p>and {data.length - 4} more...</p>}
          </TooltipContainer>
        ) : null}
      </motion.div>
    )
  }

  if (purpose === 'profileSneakPeek') {
    content = (
      <motion.div className='flex items-center gap-2 group/profile top-full w-fit'>
        {children}
        <TooltipContainer className='group-hover/profile:opacity-100 bg-stone-800'>
          <div>
            <img
              className='blog-thumb object-contain'
              src={`${BASE_URL}/uploads/avatar/${props.avatar}`}
              alt='avatar'
            />
            <p className='mt-2 text-xl text-white'>
              {generateFullName(props.firstName, props.lastName)}
            </p>
          </div>
        </TooltipContainer>
      </motion.div>
    )
  }

  return <div className='sm:mx-auto'>{content}</div>
}
export default Tooltip
