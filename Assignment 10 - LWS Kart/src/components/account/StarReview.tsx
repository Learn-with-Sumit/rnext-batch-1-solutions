'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const StarReview = ({ rating, setRating, hover, setHover }: IStarReview) => (
  <TooltipProvider delayDuration={100}>
    <div className='flex items-center mb-4'>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1

        return (
          <Tooltip
            open={typeof hover === 'number' && hover === ratingValue}
            key={index}
          >
            <TooltipTrigger>
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                onClick={() => setRating(ratingValue)}
                className='cursor-pointer'
              >
                <FaStar
                  size={24}
                  color={
                    ratingValue <= (hover! || rating!) ? '#ffc107' : '#e4e5e9'
                  }
                />
              </motion.div>
            </TooltipTrigger>
            <TooltipContent className='relative bottom-2'>
              {ratingValue} Star{ratingValue > 1 ? 's' : ''}
            </TooltipContent>
          </Tooltip>
        )
      })}
    </div>
  </TooltipProvider>
)

export default StarReview
