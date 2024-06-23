'use client'
import { motion } from 'framer'

const CookTime = () => {
  return (
    <motion.svg
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
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
      <path d='M6.5 17h11' />
      <path d='M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z' />
      <path d='M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z' />
    </motion.svg>
  )
}
export default CookTime
