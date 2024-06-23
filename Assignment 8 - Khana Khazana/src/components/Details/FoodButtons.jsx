'use client'

import useFoodButtons from '@/hooks/useFoodButtons.js'
import { BASE_URL } from '@/util/constants.js'
import { motion } from 'framer'
import { ImCross } from 'react-icons/im'
import { TbLoader2 } from 'react-icons/tb'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Favourite from '../Icons/Favourite.jsx'
import Share from '../Icons/Share.jsx'
import { Tooltip } from '../Misc/Tooltip.jsx'

const FoodButtons = ({ recipeId }) => {
  const {
    favLoading,
    handleFavorite,
    isFav,
    handleClickShare,
    scope,
    setShareButtonsVisible,
    shareButtonsVisible,
    setIsOpen,
  } = useFoodButtons(recipeId)

  return (
    <div className='relative'>
      <div className='flex gap-4 justify-end'>
        <Tooltip>
          {favLoading ? (
            <div>
              <TbLoader2 className='animate-spin' />
            </div>
          ) : (
            <button
              onClick={handleFavorite}
              className={`flex gap-2 ${
                isFav ? 'text-[#eb4a36]' : 'text-gray-600'
              } cursor-pointer hover:text-[#eb4a36] duration-200`}
            >
              <Favourite isFav={isFav} />
              <span>Favourite</span>
            </button>
          )}
        </Tooltip>
        <motion.button
          onClick={handleClickShare}
          className='flex gap-2 text-gray-600 cursor-pointer hover:text-[#0E79F6] duration-200'
        >
          <Share />
          <span>Share</span>
        </motion.button>
        <div
          ref={scope}
          className={`absolute top-10 flex flex-col gap-2 bg-white p-2 rounded-md shadow-md ${
            shareButtonsVisible ? 'block' : 'hidden'
          }`}
        >
          <motion.button
            onClick={() => {
              setShareButtonsVisible(false)
              setIsOpen(false)
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='self-end'
          >
            <ImCross />
          </motion.button>
          {/* this part is the dropdown that shows up when user clicks the share button */}
          <ul className='p-2'>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <FacebookShareButton
                url={`${BASE_URL}/recipe-details/${recipeId}`}
              >
                <div className='flex gap-2 items-center'>
                  <FacebookIcon size={30} />
                  <p>Share on Facebook</p>
                </div>
              </FacebookShareButton>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <EmailShareButton url={`${BASE_URL}/recipe-details/${recipeId}`}>
                <div className='flex gap-2 items-center'>
                  <EmailIcon size={30} />
                  <p>Share by Email</p>
                </div>
              </EmailShareButton>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TwitterShareButton
                url={`${BASE_URL}/recipe-details/${recipeId}`}
              >
                <div className='flex gap-2 items-center'>
                  <TwitterIcon size={30} />
                  <p>Share on Twitter</p>
                </div>
              </TwitterShareButton>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <TelegramShareButton
                url={`${BASE_URL}/recipe-details/${recipeId}`}
              >
                <div className='flex gap-2 items-center'>
                  <TelegramIcon size={30} />
                  <p>Share on telegram</p>
                </div>
              </TelegramShareButton>
            </motion.li>
          </ul>
        </div>

        <ToastContainer />
      </div>
    </div>
  )
}
export default FoodButtons
