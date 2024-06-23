import { motion } from 'framer-motion'

const DeleteModal = ({ handleShowModal, handleDelete }) => {
  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className='relative justify-center w-[clamp(50%,700px,90%)] h-[min(50%,300px)] flex flex-col items-center m-auto px-8 py-0 rounded-xl'
    >
      <div
        className='fixed inset-0 z-10 overflow-y-auto'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
      >
        <div className='flex items-end  justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <div className='relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl rtl:text-right dark:bg-gray-900 sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
            <div>
              <div className='flex items-center justify-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-8 h-8 text-gray-700 dark:text-gray-300'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                  />
                </svg>
              </div>

              <div className='mt-2 text-center'>
                <h3
                  className='text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white'
                  id='modal-title'
                >
                  Delete Comment ?
                </h3>
                <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
                  Are you sure you want to delete this comment?
                </p>
              </div>
            </div>

            <div className='mt-5 sm:flex sm:items-center sm:justify-between'>
              <button
                onClick={() => handleShowModal(false)}
                className='w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40'
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className='w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md sm:w-auto sm:mt-0 hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
export default DeleteModal
