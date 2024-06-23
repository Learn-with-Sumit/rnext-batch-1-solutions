import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useDebounce from '../../hooks/useDebounce.js'

const ScrollToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [pageHeight, setPageHeight] = useState(0)
  const { pathname } = useLocation()

  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const debouncedHandleScroll = useDebounce(handleScroll, 100) // so the scroll event is checked after 100 millisecond to avoid unnecessary re-renders on scroll

  useEffect(() => {
    const updatePageHeight = () => {
      setPageHeight(document.body.scrollHeight)
    }

    window.addEventListener('scroll', debouncedHandleScroll)
    window.addEventListener('resize', updatePageHeight)

    updatePageHeight() // call initially to get current page height

    // cleanup
    return () => {
      window.removeEventListener('scroll', () => debouncedHandleScroll())
      window.removeEventListener('resize', updatePageHeight)
    }
  }, [debouncedHandleScroll])

  return (
    pathname !== '/write-blog' && (
      <motion.button
        onClick={handleScrollToTop}
        initial={{ scale: 0 }}
        animate={{
          scale: scrollPosition > pageHeight - scrollPosition - 400 ? 1 : 0, // if user has scrolled too much, show the button
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ y: -4, scale: 1.1 }}
        whileTap={{ scale: 0.9, transition: { type: 'spring' } }}
        id='to-top-button'
        title='Go To Top'
        className='fixed z-50 bottom-20 right-10 border-0 w-14 h-14 rounded-full shadow-md bg-red-500 p-4 text-white text-lg font-semibold transition-colors duration-300 flex justify-center items-center'
      >
        ☝
      </motion.button>
    )
  )
}

export default ScrollToTop
