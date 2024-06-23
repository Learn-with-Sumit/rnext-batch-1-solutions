import { motion } from 'framer-motion'
import Link from 'next/link'
import { BsCart4 } from 'react-icons/bs'

const EmptyCart = ({ dictionary }: { dictionary: any }) => {
  const { cartIsEmpty, goTo, shop, and, addSomething } = dictionary

  return (
    <div className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800'>
      <div className='flex flex-col items-center'>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 dark:text-white text-center'>
          {cartIsEmpty}
        </h1>
        <motion.div
          animate={{
            y: [0, -10, 0],
            transition: { duration: 2, repeat: Infinity },
          }}
        >
          <BsCart4 className='text-7xl text-center' />
        </motion.div>
      </div>
      <div>
        <div className='flex items-center justify-center mt-2 text-gray-700 dark:text-gray-200'>
          <span>{goTo}</span>
          <Link
            className='mx-2 text-blue-600 cursor-pointer dark:text-blue-400 hover:underline'
            tabIndex={0}
            role='link'
            href={'/shop'}
          >
            {shop}
          </Link>
          <span>{and}</span>
          <p className='mx-2'>{addSomething}</p>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
