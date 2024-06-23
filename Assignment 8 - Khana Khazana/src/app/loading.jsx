'use client'
import { LOADING_TEXTS } from '@/util/constants.js'
import getRndInteger from '@/util/getRandomInteger.js'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IoFastFoodOutline } from 'react-icons/io5'
import { MdFastfood } from 'react-icons/md'
import { PiBowlFoodFill } from 'react-icons/pi'

const Loading = () => {
  // strange, without keys, red squiggly lines appear saying "Missing "key" prop for element in array", is it supposed to happen here?
  const icons = [
    <IoFastFoodOutline key={'a'} className='text-7xl' />,
    <MdFastfood key={'b'} className='text-7xl' />,
    <PiBowlFoodFill key={'c'} className='text-7xl' />,
  ]

  // get a random icon initially
  const [currentIconIndex, setCurrentIconIndex] = useState(getRndInteger(0, 2))

  // change icons every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [icons.length])

  return (
    <div className='min-h-[90vh] flex justify-center items-center'>
      <motion.div
        className='border p-4 size-60 shadow-md flex justify-center items-center rounded-xl'
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
      >
        {icons.map((icon, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIconIndex ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ display: index === currentIconIndex ? 'block' : 'none' }}
          >
            <div className='ml-14 mb-2 text-sm'>{icon}</div>
            {/* show different loading texts each time */}
            <p>{LOADING_TEXTS[getRndInteger(1, 10)]}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Loading
