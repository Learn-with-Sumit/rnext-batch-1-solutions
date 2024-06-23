'use client'
import { FURNITURE_TEXTS_BN, FURNITURE_TEXTS_EN } from '@/utils/constants'
import getRndInteger from '@/utils/getRndInt'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsShop } from 'react-icons/bs'
import { FaShopify } from 'react-icons/fa'
import { GiShop } from 'react-icons/gi'
import { PiShoppingCartDuotone } from 'react-icons/pi'

const Loading = () => {
  const { lang } = useParams()
  const icons = [
    <FaShopify key={'a'} className='text-7xl' />,
    <BsShop key={'b'} className='text-7xl' />,
    <PiShoppingCartDuotone key={'c'} className='text-7xl' />,
    <GiShop key={'d'} className='text-7xl' />,
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
            <p>
              {lang === 'bn'
                ? FURNITURE_TEXTS_BN[getRndInteger(1, 10)]
                : FURNITURE_TEXTS_EN[getRndInteger(1, 10)]}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Loading
