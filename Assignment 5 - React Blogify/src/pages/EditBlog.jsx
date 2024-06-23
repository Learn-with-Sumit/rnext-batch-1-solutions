import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAxios from '../hooks/api/useAxios.js'

import FormRow from '../components/auth/FormRow.jsx'
import Loader from '../components/misc/Loader.jsx'
import { BASE_URL } from '../constants.js'
import useEditBlog from '../hooks/api/useEditBlog.js'
import useGetSingleBlog from '../hooks/api/useGetSingleBlog.js'

const EditBlog = () => {
  const {
    isLoading,
    isError,
    handleSubmit,
    onSubmit,
    preview,
    onSelectFile,
    errors,
    register,
    isPending,
  } = useEditBlog()

  return (
    <main
      className={`mb-48 ${
        isLoading && !isError ? 'flex justify-center items-center h-screen' : ''
      }`}
    >
      {isLoading && !isError ? (
        <Loader />
      ) : (
        <section>
          <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)} className='createBlog'>
              <div className='grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4'>
                <label
                  htmlFor='fileInput'
                  className='flex items-center gap-4 hover:scale-110 transition-all cursor-pointer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    {/* SVG icon for file upload */}
                  </svg>
                  <p>Upload Your Image</p>

                  <img className='w-20' src={preview} alt='preview' />
                </label>
                <input
                  id='fileInput'
                  accept='image/png, image/gif, image/jpeg'
                  type='file'
                  onChange={onSelectFile}
                  name='thumbnail'
                  style={{ display: 'none' }} // Hide the file input
                />
              </div>
              <div className='mb-6'>
                <FormRow error={errors.title}>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    type='text'
                    id='title'
                    name='title'
                    placeholder='Enter your blog title'
                  />
                </FormRow>
              </div>
              <div className='mb-6'>
                <FormRow error={errors.tags}>
                  <input
                    {...register('tags', {
                      required: 'Tag is required',
                      validate: (value) => {
                        if (!value.includes(',')) return true // if no comma, validation will pass
                        const tags = value.split(',').map((tag) => tag.trim())
                        const nonEmptyTags = tags.filter((tag) => tag !== '')

                        // Check if there are at least two non-empty tags
                        if (nonEmptyTags.length < 2) {
                          return 'At least two tags needed for comma separated tags'
                        }

                        return true // Validation passes
                      },
                    })}
                    type='text'
                    id='tags'
                    name='tags'
                    placeholder='Your Comma Separated Tags Ex. JavaScript, React, Node, Express,'
                  />
                </FormRow>
              </div>
              <div className='mb-6'>
                <FormRow error={errors.content}>
                  <textarea
                    {...register('content', {
                      required: 'Blog Content is required',
                    })}
                    id='content'
                    name='content'
                    placeholder='Write your blog content'
                    rows={8}
                  />
                </FormRow>
                <p className='text-red-500'>
                  {errors?.root?.serverError?.type === 'random' &&
                    errors?.root?.serverError?.message}
                </p>
              </div>
              <button
                disabled={isPending}
                type='submit'
                className='bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200'
              >
                {isPending ? 'Editing' : 'Edit Blog'}
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  )
}
export default EditBlog
