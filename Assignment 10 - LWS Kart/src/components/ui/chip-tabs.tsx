import { motion } from 'framer-motion'
import { Dispatch, SetStateAction } from 'react'

const tabs = ['', '1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']

const ChipTabs = ({
  currentReviewTab,
  setCurrentReviewTab,
}: {
  currentReviewTab: number
  setCurrentReviewTab: Dispatch<SetStateAction<number>>
}) => {
  return (
    <div className='px-4 py-4 rounded-lg bg-slate-900 flex items-center flex-wrap gap-2'>
      {tabs.map((tab, index) => (
        <Chip
          text={tab}
          selected={currentReviewTab === index}
          setSelected={() => setCurrentReviewTab(index)}
          key={index}
        />
      ))}
    </div>
  )
}

const Chip = ({
  text,
  selected,
  setSelected,
}: {
  text: string
  selected: boolean
  setSelected: () => void
}) => {
  return (
    <button
      onClick={setSelected}
      className={`${
        selected
          ? 'text-white'
          : 'text-slate-300 hover:text-slate-200 hover:bg-slate-700'
      } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className='relative z-10'>{text}</span>
      {selected && (
        <motion.span
          layoutId='pill-tab'
          transition={{ type: 'spring', duration: 0.5 }}
          className='absolute inset-0 z-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-md'
        ></motion.span>
      )}
    </button>
  )
}

export default ChipTabs
