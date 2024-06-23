import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

const Share = () => {
  const [fillColor, setFillColor] = useState('none')

  useEffect(() => {
    setFillColor('blue')
  }, [])

  const shareVariants = {
    initial: { fill: 'none', scaleY: 0 },
    animate: { fill: fillColor, scaleY: 1 },
  }

  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1}
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <motion.path
        d='M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'
        variants={shareVariants}
        initial='initial'
        animate='animate'
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.path
        d='M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'
        variants={shareVariants}
        initial='initial'
        animate='animate'
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.path
        d='M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'
        variants={shareVariants}
        initial='initial'
        animate='animate'
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.path
        d='M8.7 10.7l6.6 -3.4'
        variants={shareVariants}
        initial='initial'
        animate='animate'
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      <motion.path
        d='M8.7 13.3l6.6 3.4'
        variants={shareVariants}
        initial='initial'
        animate='animate'
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}

export default Share
