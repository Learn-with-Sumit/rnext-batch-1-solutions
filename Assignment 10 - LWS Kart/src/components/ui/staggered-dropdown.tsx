'use client'
import getCategoryIcon from '@/utils/getCategoryIcons'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { FilterKeys } from '../home/Categories'

import { useSearchParams } from 'next/navigation'
import { FaBed, FaCouch, FaRegBuilding, FaUtensils } from 'react-icons/fa'
import { FaMattressPillow } from 'react-icons/fa6'

const icons = [FaBed, FaCouch, FaRegBuilding, FaUtensils, FaMattressPillow]
const StaggeredDropDown = ({
  categoryNames,
  lang,
  filter,
}: {
  categoryNames: string[]
  lang: ILang['lang']
  filter: any
}) => {
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get('category')

  const dropdownRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [currentIconIndex, setCurrentIconIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length)
    }, 1000) // change icon every 2 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  const CurrentIcon = icons[currentIconIndex]

  return (
    <div className='flex items-center justify-center'>
      <motion.div
        ref={dropdownRef}
        animate={open ? 'open' : 'closed'}
        className='relative'
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className='flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-colors'
        >
          <motion.span
            key={currentIconIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CurrentIcon />
          </motion.span>
          <span className='font-medium text-sm'>
            {currentCategory || 'Categories'}
          </span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top', translateX: '-50%' }}
          className='flex flex-col gap-2 p-2 rounded-lg z-50 bg-white dark:bg-black  shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden'
        >
          {categoryNames.map((category) => (
            <Option
              key={category}
              text={filter[`${category as FilterKeys}`]}
              Icon={getCategoryIcon(category)}
              setOpen={setOpen}
              href={`/${lang}/shop?category=${category}`}
            />
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}
const Option = ({
  text,
  Icon,
  setOpen,
  href,
}: {
  text: string
  Icon: ReactNode
  setOpen: Dispatch<SetStateAction<boolean>>
  href: string
}) => {
  return (
    <motion.li variants={itemVariants} onClick={() => setOpen(false)}>
      <Link
        className='flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md dark:text-white dark:hover:bg-gray-500 hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer'
        href={href}
      >
        <motion.span variants={actionIconVariants}>{Icon}</motion.span>
        <span>{text}</span>
      </Link>
    </motion.li>
  )
}

export default StaggeredDropDown

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
}

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
}

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
}

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
}
