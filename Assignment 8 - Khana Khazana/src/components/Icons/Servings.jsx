'use client'
import { motion } from 'framer'
const Servings = () => {
  return (
    <motion.svg
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      className='mx-auto'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0' />
      <path d='M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
      <path d='M21 21v-2a4 4 0 0 0 -3 -3.85' />
    </motion.svg>
  )
}
export default Servings
