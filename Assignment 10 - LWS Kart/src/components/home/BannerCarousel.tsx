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
import image2 from '../../assets/banner-bg-1.jpg'
import image3 from '../../assets/banner-bg-2.jpg'
import image1 from '../../assets/banner-bg.jpg'
const BannerCarousel = () => {
  // define an array of images for the carousel
  const images = [image1, image2, image3]

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
          <CarouselItem key={index}>
            <Image
              placeholder='blur'
              src={image}
              alt={`Banner ${index + 1}`}
              className='w-full h-auto max-h-96 object-cover'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className='absolute right-2 z-50' />
    </Carousel>
  )
}
export default BannerCarousel
