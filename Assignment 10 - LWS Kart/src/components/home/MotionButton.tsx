'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { FaShoppingBag, FaShoppingCart } from 'react-icons/fa'
import { IoLogOut } from 'react-icons/io5'
import { MdOutlineDangerous } from 'react-icons/md'

const MotionButton = (prop: IMotionButtonProp) => {
  const { className, icon, text, href, clickFunction, disabled } = prop
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (href) {
      router.push(href)
    }
    clickFunction?.()
  }

  let iconComponent: ReactNode

  const commonClassName = isHovered ? 'ml-2' : 'ml-0'

  switch (icon) {
    case 'shop':
      iconComponent = <FaShoppingCart className={commonClassName} />
      break
    case 'cart':
      iconComponent = <FaShoppingBag className={commonClassName} />
      break
    case 'stockOut':
      iconComponent = <MdOutlineDangerous className={commonClassName} />
    case 'logOut':
      iconComponent = <IoLogOut className={commonClassName} />
    case 'arrow-right':
      iconComponent = <ArrowRight className={commonClassName} />

    default:
      break
  }

  return (
    <div>
      <motion.button
        disabled={disabled}
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
      >
        <span className='ml-3'>{text}</span>
        <motion.div
          initial={{ opacity: 0, marginLeft: '-10px' }}
          animate={{
            opacity: isHovered ? 1 : 0,
            marginLeft: isHovered ? '0' : '-10px',
          }}
          transition={{ duration: 0.3 }}
        >
          {iconComponent}
        </motion.div>
      </motion.button>
    </div>
  )
}

export default MotionButton
