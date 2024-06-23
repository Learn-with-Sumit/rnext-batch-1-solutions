'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavlinkWrapper extends WrapperChild {
  href: string
}

const Navlink = ({ children, href }: NavlinkWrapper) => {
  const pathname = usePathname()

  // the about and contact page is unused
  return (
    <Link href={href !== '/about' && href !== '/contact' ? href : '/'}>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${
          pathname === href ||
          (pathname === href && pathname.includes('admin-dashboard'))
            ? 'bg-gradient-to-r from-violet-500 to-purple-500 group p-3 rounded-lg'
            : 'text-gray-200 hover:bg-gradient-to-r rounded-lg hover:from-violet-500 hover:to-purple-500 bg-purple-700'
        }  p-2 rounded-full hover:text-white transition flex items-center gap-1 shadow-lg border`}
      >
        {children}
      </motion.div>
    </Link>
  )
}
export default Navlink
