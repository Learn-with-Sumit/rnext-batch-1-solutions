'use client'

// ---------------------------------------------------------------------------------------------------------------
// THIS TOOLTIP SHOWS UP ON THE FAVORITE BUTTON IF USER IS NOT LOGGED IN AND IF USER HOVERS IT ON THE DETAILS PAGE
// ---------------------------------------------------------------------------------------------------------------

import { useAuth } from '@/hooks/useAuth.js'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { useState } from 'react'

export const Tooltip = ({ children }) => {
  const [isHovered, setIsHovered] = useState(null)
  const { user } = useAuth()
  const springConfig = { stiffness: 100, damping: 5 }

  const x = useMotionValue(0)

  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  )

  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  )

  return (
    <div className='flex flex-row items-center justify-center  mb-10 w-32'>
      <div
        className='-mr-4 relative group'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode='sync'>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{
                opacity: !user?._id && isHovered ? 1 : 0,
                y: 0,
                scale: 1,
                transition: {
                  type: 'spring',
                  stiffness: 260,
                  damping: 10,
                },
              }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              style={{
                translateX: translateX,
                rotate: rotate,
                whiteSpace: 'nowrap',
              }}
              className='absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-red-500 z-50 shadow-xl px-4 py-2'
            >
              <div className='font-bold text-white relative z-30 text-base'>
                Log in to mark as favorite
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div>{children}</div>
      </div>
    </div>
  )
}
