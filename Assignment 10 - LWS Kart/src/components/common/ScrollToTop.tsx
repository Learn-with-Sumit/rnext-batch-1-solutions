'use client'
import useDebounce from '@/hooks/misc-hooks/useDebounce'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BiUpArrow } from 'react-icons/bi'

const SCROLL_HEIGHT_BEFORE_TRIGGER = 3000

const ScrollToTop = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  const handleScroll = () => {
    const position: number = window.scrollY
    setScrollPosition(position)
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const debouncedHandleScroll = useDebounce(handleScroll, 100)

  useEffect(() => {
    // debounce the scroll event handler
    window.addEventListener('scroll', () => debouncedHandleScroll())
    return () => {
      window.removeEventListener('scroll', () => debouncedHandleScroll())
    }
  }, [debouncedHandleScroll])

  return (
    <motion.button
      onClick={handleScrollToTop}
      initial={{ scale: 0 }} // initial scale when button is not visible
      animate={{
        scale: scrollPosition > SCROLL_HEIGHT_BEFORE_TRIGGER ? 1 : 0, // scale to 1 when scrollPosition > 4000, otherwise scale to 0
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }} // add a spring transition for a smooth effect
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.9, transition: { type: 'spring' } }}
      id='to-top-button'
      title='Go To Top'
      className={`fixed z-50 bottom-10 right-10 p-4 border-0 w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-sky-400 to-cyan-300 text-white text-lg font-semibold transition-colors duration-300 flex justify-center items-center`}
    >
      <BiUpArrow className='text-red-400 text-2xl' />
    </motion.button>
  )
}

export default ScrollToTop
