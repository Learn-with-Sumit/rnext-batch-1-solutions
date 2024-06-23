'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.002,
  })

  return (
    <motion.div
      className='fixed top-0 left-0 origin-top-left right-0 h-2 bg-green-500 rounded-r-full z-[9999]'
      style={{ scaleX }}
    />
  )
}
export default ScrollProgress
