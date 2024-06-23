'use client'
import { doSignOut } from '@/app/actions/auth.actions'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import MotionButton from '../home/MotionButton'

const SignOut = ({ text, loggingOutText, isAdmin }: ISignOutProp) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleSignOut = async () => {
    setLoading(true)
    await doSignOut()
    setLoading(false)
    // admin should move to the login page after logging out as all other pages are protected for them
    if (isAdmin) {
      router.push('/login')
    }
  }

  return (
    <div>
      {loading ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          disabled
          className='bg-gradient-to-r from-violet-500 to-purple-500 flex gap-2 items-center p-3 rounded-full text-white'
        >
          <div>
            <Loader2 className='animate-spin' />
          </div>
          <p className='text-xs'>{loggingOutText}</p>
        </motion.button>
      ) : (
        <div onClick={handleSignOut}>
          <MotionButton
            className='bg-gradient-to-r from-violet-500 to-purple-500 flex gap-2 items-center p-3 rounded-full text-white'
            icon='logOut'
            text={text}
          />
        </div>
      )}
    </div>
  )
}

export default SignOut
