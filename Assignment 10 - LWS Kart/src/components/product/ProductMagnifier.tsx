import Image from 'next/image'
import React, { useState } from 'react'

const ProductMagnifier = ({ image }: { image: string }) => {
  const magnifierHeight = 200
  const magnifierWidth = 200
  const zoomLevel = 1.5
  const [imgWidth, setImgWidth] = useState(0)
  const [imgHeight, setImgHeight] = useState(0)
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [[x, y], setXY] = useState([0, 0])

  return (
    <div className='container mx-auto lg:px-0'>
      <div className='relative h-full w-full'>
        <Image
          width={1200}
          height={1200}
          src={image}
          className='w-full hover:scale-105 transition-all duration-300 h-[500px] object-cover'
          onMouseEnter={(e) => {
            const elem = e.currentTarget
            const { width, height } = elem.getBoundingClientRect()
            setImgWidth(width)
            setImgHeight(height)
            setShowMagnifier(true)
          }}
          onMouseMove={(e) => {
            const elem = e.currentTarget
            const { top, left } = elem.getBoundingClientRect()
            const x = e.pageX - left - window.pageXOffset
            const y = e.pageY - top - window.pageYOffset
            setXY([x, y])
          }}
          onMouseLeave={() => {
            setShowMagnifier(false)
          }}
          alt='img'
        />

        {showMagnifier && (
          <div
            className='absolute pointer-events-none border border-gray-200 bg-white'
            style={{
              height: `${magnifierHeight}px`,
              width: `${magnifierWidth}px`,
              top: `${y - magnifierHeight / 2}px`,
              left: `${x - magnifierWidth / 2}px`,
              backgroundImage: `url('${image}')`,
              backgroundSize: `${imgWidth * zoomLevel}px ${
                imgHeight * zoomLevel
              }px`,
              backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
              backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
            }}
          />
        )}
      </div>
    </div>
  )
}
export default ProductMagnifier
