import { useQueryClient } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import DeleteIcon from '../../assets/icons/delete.svg'
import useComment from '../../hooks/api/useComment.js'
import useAuth from '../../hooks/useAuth.js'
import usePortal from '../../hooks/usePortal.js'
import FormRow from '../auth/FormRow.jsx'
import Avatar from '../common/Avatar.jsx'
import Comment from './Comment.jsx'
import DeleteModal from './DeleteModal.jsx'

const CommentSection = forwardRef(({ blog = {} }, ref) => {
  const { showModal, handleShowModal } = usePortal()
  const queryClient = useQueryClient()
  const { auth: { user: { id: userId, avatar } = {}, token } = {} } = useAuth() // destructure user id
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm()
  const { ref: contentRef, ...rest } = register('content', {
    required: 'Write something first',
  }) // here taking the react hook forms ref also into account

  const isLoggedIn = token?.accessToken

  const [currentCommentId, setCurrentCommentId] = useState(null)
  const [justDeletedComment, setJustDeletedComment] = useState(null) // storing the content of deleted comment so it can be added again with the undo button

  const { data: { author: { firstName } = {}, comments, id: blogId } = {} } =
    blog

  const {
    mutation: { mutate },
    deleteMutation: { mutate: deleteMutation },
  } = useComment()

  // code will run after mutation
  const runMutationAfterEffect = (message, autoClose) => {
    return {
      // set the hook form error on error
      onError: (error) => {
        setError('root.serverError', {
          type: 'random',
          message: error?.response?.data?.error || error?.message,
        })
      },
      // show toast on success
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: ['single-blog', variables.blogId],
        })
        // close the modal when the request is done
        if (showModal) handleShowModal(false)

        // reset the comment field
        resetField('content')

        // if method is delete and status is OK then show the undo
        if (data.config.method === 'delete' && data.status === 200) {
          toast.dismiss()
          toast.success(
            <div className='flex justify-between'>
              <p>{message}</p>
              <button
                onClick={handleUndoDelete}
                className='bg-black hover:text-green-400 hover:bg-slate-800 transition-colors rounded-md w-24 text-green-500'
              >
                Undo
              </button>
            </div>,
            {
              autoClose,
            }
          )
        }
      },
    }
  }

  // or else react hook forms default ref overlaps the ref that is needed to focus and either of them does not work so, this is a solution in this case
  useImperativeHandle(contentRef, () => ref.current)

  // submit
  const onSubmit = (value) => {
    mutate({ blogId, content: value.content }, runMutationAfterEffect())
  }
  // delete
  const handleDelete = (commentId, blogId) => {
    deleteMutation(
      { blogId, commentId },
      runMutationAfterEffect('Comment Deleted Successfully', 2000)
    )
  }

  // undo delete
  const handleUndoDelete = () => {
    toast.dismiss()
    mutate({ blogId, content: justDeletedComment }, runMutationAfterEffect())
  }

  return (
    <section id='comments'>
      <div className='mx-auto w-full md:w-10/12 container'>
        {comments.length ? (
          <h2 className='text-3xl font-bold my-8'>
            Comments ({comments.length})
          </h2>
        ) : (
          <h2 className='text-3xl font-bold my-8'>No Comments</h2>
        )}
        <div className='flex items -center space-x-4'>
          <div className='avater-img bg-indigo-600 text-white'>
            <Avatar avatar={avatar} firstName={firstName} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <FormRow error={errors.content}>
              <textarea
                {...rest}
                ref={ref}
                className='w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none'
                placeholder='Write a comment'
              />
            </FormRow>
            <div className='flex justify-end mt-4'>
              <button
                disabled={!isLoggedIn}
                className={`${
                  isLoggedIn
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-gray-600 cursor-not-allowed'
                } text-white px-6 py-2 md:py-3 rounded-md  transition-all duration-200`}
              >
                Comment
              </button>
            </div>
            <p className='text-red-500'>
              {errors?.root?.serverError?.type === 'random' &&
                errors?.root?.serverError?.message}
            </p>
          </form>
        </div>
        {/* comments */}
        <AnimatePresence>
          {comments.map((comment) => {
            return (
              <Comment comment={comment} key={comment.id}>
                {comment.author.id === userId && (
                  <motion.button
                    onClick={(e) => {
                      setCurrentCommentId(comment.id)
                      setJustDeletedComment(comment.content)
                      e.preventDefault()
                      handleShowModal(true)
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, transition: 'easeIn' }}
                  >
                    <img className='w-6' src={DeleteIcon} alt='delete' />
                  </motion.button>
                )}
              </Comment>
            )
          })}
        </AnimatePresence>
      </div>
      {createPortal(
        showModal && (
          <DeleteModal
            handleDelete={() => handleDelete(currentCommentId, blogId)}
            handleShowModal={handleShowModal}
          />
        ),
        document.body
      )}
    </section>
  )
})

CommentSection.displayName = CommentSection

export default CommentSection
