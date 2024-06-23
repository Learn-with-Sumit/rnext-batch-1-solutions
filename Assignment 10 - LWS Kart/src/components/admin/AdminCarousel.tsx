'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import image2 from '../../../public/images/admin-panel-2.jpg'
import image3 from '../../../public/images/admin-panel-3.jpg'
import image1 from '../../../public/images/admin-panel.jpg'

const AdminCarousel = () => {
  // Define an array of images and corresponding texts for the carousel
  const images = [
    { src: image1, text: 'Fast and Easy' },
    { src: image2, text: 'Manage products in one place' },
    { src: image3, text: 'Manage Product Reviews' },
  ]

  return (
    <Carousel
      className='relative'
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselPrevious className='absolute left-2 z-50' />
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className='relative'>
            <Image
              placeholder='blur'
              src={image.src}
              alt={`Banner ${index + 1}`}
              className='w-full h-auto max-h-96 object-cover'
            />
            <div className='absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded'>
              {image.text}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className='absolute right-2 z-50' />
    </Carousel>
  )
}

export default AdminCarousel
