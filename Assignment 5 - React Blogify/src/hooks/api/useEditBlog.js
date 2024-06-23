import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../constants.js'
import useAxios from './useAxios.js'
import useGetSingleBlog from './useGetSingleBlog.js'

const useEditBlog = () => {
  const { id } = useParams()
  const { data, isError, isLoading } = useGetSingleBlog(id)

  const customFetch = useAxios()

  const { mutate, isPending } = useMutation({
    mutationFn: async (blog) => await customFetch.patch(`blogs/${id}`, blog),
  })
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm({
    values: {
      title: data?.data?.title,
      tags: data?.data?.tags,
      content: data?.data?.content,
    },
  })
  const navigate = useNavigate()
  // state for preview image
  const [selectedImage, setSelectedImage] = useState()
  const [preview, setPreview] = useState()

  // set the current image on mount
  useEffect(() => {
    if (data) {
      setPreview(`${BASE_URL}/uploads/blog/${data?.data?.thumbnail}`)
    }
  }, [data])

  useEffect(() => {
    let imgObjUrl
    // if no image then dont set anything
    if (!selectedImage) {
      setPreview(undefined)
      return
    } else {
      // create url
      imgObjUrl = URL.createObjectURL(selectedImage)

      setPreview(imgObjUrl)
    }
    // cleanup
    return () => URL.revokeObjectURL(imgObjUrl)
  }, [selectedImage])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) return

    // set the file
    setSelectedImage(e.target.files[0])
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('tags', data.tags)
    formData.append('content', data.content)
    if (selectedImage) {
      formData.append('thumbnail', selectedImage)
    }

    try {
      mutate(formData, {
        onSuccess: (data) => {
          toast.success(data.data.message)
          // navigate on creation
          navigate(`/blog/${data.data.id}`)
        },
        onError: (error) => {
          // show error if any error happens after submit
          setError('root.serverError', {
            type: 'random',
            message: error?.message,
          })
        },
      })
    } catch (error) {
      toast.error('Error uploading blog')
    }
  }

  return {
    isLoading,
    isError,
    handleSubmit,
    onSubmit,
    preview,
    onSelectFile,
    errors,
    register,
    isPending,
  }
}
export default useEditBlog
