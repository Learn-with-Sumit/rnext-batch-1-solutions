'use client'
import { motion } from 'framer'
const Prep = () => {
  return (
    <motion.svg
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
      xmlns='http://www.w3.org/2000/svg'
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
      <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
      <path d='M12 7v5l3 3' />
    </motion.svg>
  )
}
export default Prep
