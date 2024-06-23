/* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { generateFullName } from '../../utils/generateFullName.js'
import Avatar from '../common/Avatar.jsx'

const Comment = ({ comment, children }) => {
  const {
    author: { id, firstName, lastName, avatar },
    content,
    id: commentId,
  } = comment
  return (
    <motion.div
      layout
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'tween', duration: 0.2 }}
      className='flex items-start space-x-4 my-8'
      key={commentId}
    >
      <Link to={`/profile/${id}`}>
        <div className='avater-img bg-orange-600 text-white'>
          <Avatar avatar={avatar} firstName={firstName} />
        </div>
      </Link>
      <div className='w-full'>
        <h5 className='text-slate -500 font-bold'>
          {generateFullName(firstName, lastName)}
        </h5>
        <div className='flex justify-between'>
          <p className='text-slate-300 w-fit'>{content}</p>
          {children}
        </div>
      </div>
    </motion.div>
  )
}
export default Comment
