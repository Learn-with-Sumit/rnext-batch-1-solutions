'use client'

import Image from 'next/image'
import BD from '../../../public/bd.png'
import US from '../../../public/us.png'

import { useMenuAnimation } from '@/hooks/misc-hooks/useMenuAnimation'
import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

type Language = {
  code: string
  language: string
}

const languages: Language[] = [
  {
    code: 'en',
    language: 'English',
  },
  {
    code: 'bn',
    language: 'বাংলা',
  },
]

const LanguageSwitcher = () => {
  const router = useRouter()
  const pathname = usePathname()
  const menuRef = useRef<HTMLUListElement>(null)
  const found = languages.find((lang) => pathname.includes(lang.code))
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    found ?? languages[0]
  )
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const scope = useMenuAnimation(showMenu)

  // from the pathname
  useEffect(() => {
    setSelectedLanguage({
      ...selectedLanguage,
      code: pathname.split('/')[1],
      language: pathname.split('/')[1] === 'en' ? 'English' : 'বাংলা',
    })
  }, [pathname])

  // close menu when clicked outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    if (showMenu) {
      document.addEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [showMenu])

  // change language
  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage({
      ...selectedLanguage,
      code: lang,
      language: lang === 'en' ? 'English' : 'বাংলা',
    })
    setShowMenu(false)
    router.push(`/${lang}/`)
    router.refresh()
  }

  return (
    <div className='flex gap-4 items-center text-white '>
      <div className='relative'>
        <button
          className='flex items-center gap-2'
          onClick={() => setShowMenu(!showMenu)}
        >
          <Image
            className='max-w-8'
            src={
              selectedLanguage.language.toLowerCase().slice(0, 2) === 'en'
                ? US
                : BD
            }
            alt={selectedLanguage.language}
            height={100}
            width={165}
          />
          {selectedLanguage.language}
        </button>
        <div ref={scope} className='shadow-lg'>
          <motion.ul
            ref={menuRef}
            className={`absolute ${
              showMenu ? 'block' : 'hidden'
            } right-0 top-full mt-2 w-40 rounded-md bg-white dark:bg-black p-2 z-10 shadow-lg`}
          >
            {languages.map((entry) => (
              <li
                key={entry.code}
                onClick={() => handleLanguageChange(entry.code)}
                className='flex items-center gap-2 p-2 rounded-md cursor-pointer text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-500'
              >
                <Image
                  className='max-w-8'
                  src={entry.code === 'en' ? US : BD}
                  alt={entry.language}
                  height={100}
                  width={165}
                />
                {entry.language}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>
    </div>
  )
}

export default LanguageSwitcher
