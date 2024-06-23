'use client'

import { INDEX_BEFORE_LINE_BREAK_SHOULD_OCCUR } from '@/utils/constants'
import { splitString } from '@/utils/splitString'
import { motion } from 'framer-motion'

const charVariants = {
  hidden: {
    opacity: 0,
  },
  reveal: {
    opacity: 1,
  },
}

const BannerText = ({
  mainText,
  lang,
}: {
  mainText: string
  lang: ILang['lang']
}) => {
  const bannerTextCharacters = splitString(mainText)
  return (
    <motion.div
      initial='hidden'
      animate='reveal'
      transition={{ staggerChildren: 0.1 }}
    >
      {bannerTextCharacters.map((char, index) => (
        <motion.span
          className='text-5xl mb-4 capitalize leading-normal bg-gradient-to-r from-amber-200 to-yellow-500 font-bold drop-shadow-lg text-transparent bg-clip-text'
          variants={charVariants}
          key={index}
          transition={{ duration: 0.5 }}
        >
          {char}
          {/* in bengali text would break, so this logic was applied here */}
          {index ===
            INDEX_BEFORE_LINE_BREAK_SHOULD_OCCUR - (lang === 'en' ? 0 : 1) && (
            <br />
          )}
        </motion.span>
      ))}
    </motion.div>
  )
}
export default BannerText
