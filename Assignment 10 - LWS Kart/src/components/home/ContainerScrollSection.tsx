'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import containerImage from '../../assets/container-img.jpg'
import { ContainerScroll } from '../ui/container-scroll'

export function ContainerScrollSection() {
  const { lang } = useParams()

  const isLocaleBengali = lang === 'bn'

  return (
    <div className='flex flex-col overflow-hidden'>
      <ContainerScroll
        titleComponent={
          <>
            {isLocaleBengali ? (
              <h1 className='text-4xl font-semibold text-black dark:text-white'>
                ভালো জীবন যাপন করুন <br />
                <span className='text-4xl md:text-[6rem] font-bold mt-1 leading-none'>
                  LWS Kart এর সাথে
                </span>
              </h1>
            ) : (
              <h1 className='text-4xl font-semibold text-black dark:text-white'>
                Live better <br />
                <span className='text-4xl md:text-[6rem] font-bold mt-1 leading-none'>
                  with LWS Kart
                </span>
              </h1>
            )}
          </>
        }
      >
        <Image
          placeholder='blur'
          src={containerImage}
          alt='hero'
          height={720}
          width={1400}
          className='mx-auto rounded-2xl object-cover h-full object-left-top'
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}
