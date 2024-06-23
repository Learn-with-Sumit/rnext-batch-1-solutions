'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { BackgroundGradient } from '../ui/background-gradient'
import ProductMagnifier from './ProductMagnifier'

const ProductImages = ({
  image,
  otherImages,
}: {
  image: string
  otherImages: string[]
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [direction, setDirection] = useState('left')

  const handleImageChange = (index: number) => {
    if (index < currentImageIndex) {
      setDirection('right')
    } else {
      setDirection('left')
    }
    setCurrentImageIndex(index)
  }

  const currentImage =
    currentImageIndex === 0 ? image : otherImages[currentImageIndex - 1]

  return (
    <div>
      <BackgroundGradient className='overflow-hidden'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentImage}
            initial={{ x: direction === 'left' ? '100%' : '-100%' }}
            animate={{ x: '0' }}
            exit={{ x: direction === 'left' ? '-100%' : '100%' }}
            transition={{ duration: 0.3 }}
          >
            <ProductMagnifier image={currentImage} />
          </motion.div>
        </AnimatePresence>
      </BackgroundGradient>
      {/* small images */}
      <div className='grid grid-cols-5 gap-4 mt-4'>
        {[image, ...otherImages].map((img, index) => {
          return (
            <BackgroundGradient key={index}>
              <motion.div
                onClick={() => handleImageChange(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${currentImageIndex === index ? 'p-1' : 'p-0'}`}
              >
                <Image
                  width={2000}
                  height={2000}
                  src={img}
                  alt={`product${index}`}
                  className='w-full cursor-pointer border border-primary h-[76px] object-cover relative'
                />
              </motion.div>
            </BackgroundGradient>
          )
        })}
      </div>
    </div>
  )
}

export default ProductImages
