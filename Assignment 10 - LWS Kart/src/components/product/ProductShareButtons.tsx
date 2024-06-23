'use client'
import { useParams } from 'next/navigation'
import { FaFacebook, FaTelegram, FaTwitter } from 'react-icons/fa'

import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from 'react-share'

const ProductShareButtons = () => {
  const { id, lang } = useParams()

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/${lang}/product-details/${id}`
  return (
    <div className='flex gap-3 mt-4'>
      <FacebookShareButton url={url}>
        <div className='text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center'>
          <FaFacebook />
        </div>
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <div className='text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center'>
          <FaTwitter />
        </div>
      </TwitterShareButton>
      <TelegramShareButton url={url}>
        <div className='text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center'>
          <FaTelegram />
        </div>
      </TelegramShareButton>
    </div>
  )
}
export default ProductShareButtons
