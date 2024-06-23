import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAxios from './useAxios.js'

const useCreateBlog = () => {
  const customFetch = useAxios()
  const { mutate, isPending } = useMutation({
    mutationFn: (blog) => customFetch.post('blogs', blog),
  })
  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm()
  const navigate = useNavigate()
  // state for preview image
  const [selectedImage, setSelectedImage] = useState()

  const [preview, setPreview] = useState()

  // this is to preview the image after the user selects it
  useEffect(() => {
    // if no image then dont set anything
    if (!selectedImage) {
      setPreview(undefined)
      return
    }

    // create url
    const imgObjUrl = URL.createObjectURL(selectedImage)

    setPreview(imgObjUrl)

    // cleanup
    return () => URL.revokeObjectURL(imgObjUrl)
  }, [selectedImage])

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined)
      return
    }

    // set the file
    setSelectedImage(e.target.files[0])
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    if (!selectedImage) {
      toast.error('Please select an image', { autoClose: 1000 })
      return
    }

    formData.append('title', data.title)
    formData.append('tags', data.tags)
    formData.append('content', data.content)
    formData.append('thumbnail', selectedImage)

    try {
      mutate(formData, {
        onSuccess: (data) => {
          toast.success(data.data.message, { autoClose: 1000 })
          // navigate on creation
          navigate(`/blog/${data.data.blog.id}`)
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
    handleSubmit,
    onSelectFile,
    onSubmit,
    preview,
    selectedImage,
    register,
    errors,
    isPending,
  }
}
export default useCreateBlog
